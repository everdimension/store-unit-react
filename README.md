# @store-unit/react

A react integration for [store-unit](https://github.com/everdimension/store-unit)

## Getting Started

### Install

```sh
npm install @store-unit/react

```

### Usage

```typescript
import { Store } from 'store-unit';
import { useStore } from '@store-unit/react';

const themeStore = new Store({ isLight: true });

export function Component() {
  const value = useStore(themeStore);
  return (
    <div style={{ background: value.isLight ? 'white' : 'black' }}>
      <button
        onClick={() => {
          themeStore.setState({ isLight: !value.isLight });
        }}
      >
        Toggle theme
      </button>
    </div>
  );
}
```
