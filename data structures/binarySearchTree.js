var binaryST = function(key, value) {
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
}

binaryST.prototype.insert = function(key, value) {
  value = value || null;
  if (key < this.key) {
    this.left === null ? this.left = new binaryST(key, value) : this.left.insert(key, value);
  } else if (key > this.key) {
    this.right === null ? this.right = new binaryST(key, value) : this.right.insert(key, value);
  } else {
    this.value = value;
  }
}

binaryST.prototype.find = function(key) {
  if (key < this.key) {
    return this.left === null ? null : this.left.find(key);
  } else if (key > this.key) {
    return this.right === null ? null : this.right.find(key);
  } else {
    return this.value;
  }
}

var test = new binaryST('f', 1);
test.insert('c', 2);
test.insert('d', 3);
test.insert('a', 4);
test.insert('r', 5);
test.insert('z', 6);
test.insert('m', 7);
console.log(test);
test.insert('m', 'newkey');
test.insert('r', 'diffkey');
test.insert('c', 'unikkey');
console.log(test);
