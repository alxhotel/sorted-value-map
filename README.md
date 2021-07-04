# sorted-value-map

[![NPM Version](https://img.shields.io/npm/v/sorted-value-map.svg)](https://www.npmjs.com/package/sorted-value-map)
[![Build status](https://github.com/alxhotel/sorted-value-map/actions/workflows/ci.yml/badge.svg)](https://github.com/alxhotel/sorted-value-map)

Map with sorted values.

## Install

```sh
npm install sorted-value-map
```

## Usage

```js
const { SortedValueMap } = require('sorted-value-map')

const map = new SortedValueMap((a, b) => {
  if (a < b) return -1
  else if (a > b) return 1
  else return 0
})

map.insert("key-a", 8)
map.insert("key-b", 2)

for (const a of map.values()) {
  console.log(a) // 2, 8
}
```

## API

SortedValueMap uses the same API as the official [Map](https://developer.mozilla.org/es/docs/orphaned/Web/JavaScript/Reference/Global_Objects/Map).

### `const map = new SortedValueMap([comparator])`

### `map.insert(key, value)`

### `map.remove(key)`

### `map.size`

### `map.clear()`

### `map.entries()`

### `map.keys()`

### `map.values()`

## License

MIT. Copyright (c) [Alex](https://github.com/alxhotel)
