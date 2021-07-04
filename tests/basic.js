const test = require('tape')
const { SortedValueMap } = require('../')

test('create map instance', function (t) {
  t.plan(1)

  const map = new SortedValueMap()
  t.assert(map instanceof SortedValueMap)
})

test('get', function (t) {
  t.plan(3)

  const map = new SortedValueMap()

  map.set('key-a', 4)
  t.equals(map.get('key-a'), 4)

  map.set('key-a', 5)
  t.equals(map.get('key-a'), 5)

  map.delete('key-a')
  t.equals(map.get('key-a'), null)
})

test('has', function (t) {
  t.plan(3)

  const map = new SortedValueMap()

  map.set('key-a', 4)
  t.assert(map.has('key-a'))

  map.set('key-a', 5)
  t.assert(map.has('key-a'))

  map.delete('key-a')
  t.assert(!map.has('key-a'))
})

test('set simple', function (t) {
  t.plan(4)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  t.equals(map.size, 1)

  map.set('key-a', 1)
  t.equals(map.size, 1)

  map.set('key-a', 2)
  t.equals(map.size, 1)

  t.equals(map.get('key-a'), 2)
})

test('set multiple', function (t) {
  t.plan(5)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)

  t.equals(map.size, 4)

  let i = 0
  const res = [1, 2, 3, 4]
  for (const v of map.values()) {
    t.equals(v, res[i])
    i++
  }
})

test('delete multiple', function (t) {
  t.plan(5)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)

  map.delete('key-d')
  t.equals(map.size, 3)

  map.delete('key-d')
  t.equals(map.size, 3)

  let i = 0
  const res = [1, 3, 4]
  for (const v of map.values()) {
    t.equals(v, res[i])
    i++
  }
})

test('entries', function (t) {
  t.plan(4)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)

  const res = { 'key-a': 1, 'key-b': 3, 'key-c': 4, 'key-d': 2 }
  const entries = map.entries()
  for (const [k, v] of entries) {
    t.equals(res[k], v)
  }
})

test('keys', function (t) {
  t.plan(7)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)
  t.equals(map.size, 4)

  map.set('key-e', 8)
  t.equals(map.size, 5)

  map.delete('key-e')
  t.equals(map.size, 4)

  const res = ['key-a', 'key-b', 'key-c', 'key-d']
  const keys = map.keys()
  for (const k of keys) {
    t.assert(res.indexOf(k) !== -1)
  }
})

test('forEach', function (t) {
  t.plan(9)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)
  t.equals(map.size, 4)

  const res = { 'key-a': 1, 'key-b': 3, 'key-c': 4, 'key-d': 2 }
  map.forEach((v, k, m) => {
    t.equals(m, map)
    t.equals(v, res[k])
  })
})

test('iterate', function (t) {
  t.plan(5)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)
  t.equals(map.size, 4)

  const res = { 'key-a': 1, 'key-b': 3, 'key-c': 4, 'key-d': 2 }
  for (const [k, v] of map) {
    t.equals(v, res[k])
  }
})

test('clear', function (t) {
  t.plan(5)

  const map = new SortedValueMap()

  map.set('key-a', 1)
  map.set('key-b', 3)
  map.set('key-c', 4)
  map.set('key-d', 2)
  t.equals(map.size, 4)

  map.clear()

  t.equals(map.size, 0)
  t.equals(map.keys().next().done, true)
  t.equals(map.values().next().done, true)
  t.equals(map.entries().next().done, true)
})
