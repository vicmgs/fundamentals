var redBlackTree = function(key, value) {
  this.root = new Node(key, value, true);
  return this.root;
}

var Node = function(key, value, root) {
  this.root = root || false;
  this.color = this.root ? 'black' : 'red';
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
}

rotateLeft = function(node) {
  var x = node.right;
  node.right = x.left;
  x.left = node;
  x.color = node.color;
  x.root = node.root;
  node.color = 'red';
  node.root = false;
  return x;
}

rotateRight = function(node) {
  var x = node.left;
  node.left = x.right;
  x.right = node;
  x.root = node.root;
  x.color = node.color;
  node.color = 'red';
  node.root = false;
  return x;
}

flipColors = function(node) {
  node.color = 'red';
  node.left.color = 'black';
  node.right.color = 'black';
  if (node.root) {
    node.color = 'black';
  }
}

insert = function(node, key, value) {
  if (node === null) {
    return new Node(key, value);
  }

  if (key < node.key) {
    node.left = insert(node.left, key, value);
  } else if (key > node.key) {
    node.right = insert(node.right, key, value);
  } else {
    node.value = value;
  }

  if (node.left === null && node.right && node.right.color === 'red' || node.left && node.right && node.left.color === 'black' && node.right.color === 'red') {
    node = rotateLeft(node);
  }
  if (node.left && node.left.color === 'red' && node.left.left && node.left.left.color == 'red') {
    node = rotateRight(node);
  }
  if (node.left && node.left.color === 'red' && node.right && node.right.color === 'red') {
    flipColors(node);
  }
  return node;
}

find = function(node, key) {
  if (key < node.key) {
    return node.left === null ? null : find(node.left, key);
  } else if (key > node.key) {
    return node.right === null ? null : find(node.right, key);
  } else {
    return node.value;
  }
}

var test = new redBlackTree('f', 1, true);
test = insert(test, 'b', 2);
test = insert(test, 'r', 5);
test = insert(test, 'd', 3);
console.log(test);
test = insert(test, 'm', 7);
test = insert(test, 'z', 6);
console.log(test);
test = insert(test, 'c', 10);
console.log(test);
