import { useState, useEffect } from 'react';
import type { Store } from 'store-unit';

interface DisposableStore<T> extends Store<T> {
  dispose: () => void;
}

function isDisposableStore<T>(
  store: Store<T> | DisposableStore<T>
): store is DisposableStore<T> {
  return 'dispose' in store && Boolean(store.dispose);
}

export function useStore<State>(store: Store<State> | DisposableStore<State>) {
  const [value, setValue] = useState<Store<State>['state']>(() => {
    return store.getState();
  });
  const newValue = store.getState();
  if (newValue !== value) {
    setValue(newValue);
  }
  useEffect(() => {
    // https://github.com/facebook/react/blob/985272e26858ce3838fde856b022200b9c7d3dcb/packages/use-subscription/src/useSubscription.js#L74-L80
    let didUnsubscribe = false;
    setValue(store.getState());
    const unlisten = store.on('change', newState => {
      if (didUnsubscribe) {
        return;
      }
      setValue(newState);
    });
    return () => {
      didUnsubscribe = true;
      unlisten();
      if (isDisposableStore(store)) {
        store.dispose();
      }
    };
  }, [store]);
  return value;
}
