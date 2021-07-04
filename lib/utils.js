function rotateLeft (node) {
  const rightNode = node.right
  node.right = rightNode.left

  if (rightNode.left) rightNode.left.parent = node

  rightNode.parent = node.parent
  if (rightNode.parent) {
    if (rightNode.parent.left === node) {
      rightNode.parent.left = rightNode
    } else {
      rightNode.parent.right = rightNode
    }
  }

  node.parent = rightNode
  rightNode.left = node

  node.balanceFactor += 1
  if (rightNode.balanceFactor < 0) {
    node.balanceFactor -= rightNode.balanceFactor
  }

  rightNode.balanceFactor += 1
  if (node.balanceFactor > 0) {
    rightNode.balanceFactor += node.balanceFactor
  }
  return rightNode
}

function rotateRight (node) {
  const leftNode = node.left
  node.left = leftNode.right
  if (node.left) node.left.parent = node

  leftNode.parent = node.parent
  if (leftNode.parent) {
    if (leftNode.parent.left === node) {
      leftNode.parent.left = leftNode
    } else {
      leftNode.parent.right = leftNode
    }
  }

  node.parent = leftNode
  leftNode.right = node

  node.balanceFactor -= 1
  if (leftNode.balanceFactor > 0) {
    node.balanceFactor -= leftNode.balanceFactor
  }

  leftNode.balanceFactor -= 1
  if (node.balanceFactor < 0) {
    leftNode.balanceFactor += node.balanceFactor
  }

  return leftNode
}

// HACK: add custom AVLTree remove function
const removeNode = (self) => {
  return function (node) {
    if (!self._root || !node) return null

    const returnValue = node.key
    let max, min

    if (node.left) {
      max = node.left

      while (max.left || max.right) {
        while (max.right) max = max.right

        node.key = max.key
        node.data = max.data
        if (max.left) {
          node = max
          max = max.left
        }
      }

      node.key = max.key
      node.data = max.data
      node = max
    }

    if (node.right) {
      min = node.right

      while (min.left || min.right) {
        while (min.left) min = min.left

        node.key = min.key
        node.data = min.data
        if (min.right) {
          node = min
          min = min.right
        }
      }

      node.key = min.key
      node.data = min.data
      node = min
    }

    let parent = node.parent
    let pp = node
    let newRoot

    while (parent) {
      if (parent.left === pp) parent.balanceFactor -= 1
      else parent.balanceFactor += 1

      if (parent.balanceFactor < -1) {
        // inlined
        // var newRoot = rightBalance(parent);
        if (parent.right.balanceFactor === 1) rotateRight(parent.right)
        newRoot = rotateLeft(parent)

        if (parent === self._root) self._root = newRoot
        parent = newRoot
      } else if (parent.balanceFactor > 1) {
        // inlined
        // var newRoot = leftBalance(parent);
        if (parent.left.balanceFactor === -1) rotateLeft(parent.left)
        newRoot = rotateRight(parent)

        if (parent === self._root) self._root = newRoot
        parent = newRoot
      }

      if (parent.balanceFactor === -1 || parent.balanceFactor === 1) break

      pp = parent
      parent = parent.parent
    }

    if (node.parent) {
      if (node.parent.left === node) node.parent.left = null
      else node.parent.right = null
    }

    if (node === self._root) self._root = null

    self._size--
    return returnValue
  }
}

module.exports = {
  removeNode
}
