const AVLTree = require('avl')
const { removeNode } = require('./utils')

const DEFAULT_COMPARATOR = function (a, b) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

class SortedValueMap {
  constructor (comparator) {
    if (comparator && typeof comparator !== 'function') throw new Error('comparator is not a function')

    this._comparator = comparator || DEFAULT_COMPARATOR

    // entries
    this._tree = new AVLTree(this._comparator)
    this._tree.removeNode = removeNode(this._tree)

    // key => tree node
    this._map = new Map()
  }

  get size () {
    return this._map.size
  }

  get (key) {
    const treeNode = this._map.get(key)
    if (!treeNode) return null
    return treeNode.data
  }

  has (key) {
    return this._map.has(key)
  }

  set (key, value) {
    if (this.has(key)) this.delete(key)

    const treeNode = this._tree.insert(value, value)
    this._map.set(key, treeNode)
  }

  delete (key) {
    const treeNode = this._map.get(key)
    if (!treeNode) return

    this._tree.removeNode(treeNode)
    this._map.delete(key)
  }

  clear () {
    this._tree.clear()
    this._map.clear()
  }

  * entries () {
    const keys = this._map.keys()
    const res = []
    for (const k of keys) {
      const treeNode = this._map.get(k)
      res.push([k, treeNode.data])
    }

    yield * res
  }

  keys () {
    return this._map.keys()
  }

  * values () {
    yield * this._tree.values()
  }

  [Symbol.iterator] () {
    return this.entries()
  }

  forEach (callback) {
    const keys = this._map.keys()
    for (const key of keys) {
      const value = this._map.get(key).data
      callback(value, key, this)
    }
  }
}

module.exports = SortedValueMap
