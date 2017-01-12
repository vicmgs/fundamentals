var hash = require('../data_structures/hashingFunction.js');
var linkedList = require('../data_structures/linkedList.js');
var doublyLinkedList = require('../data_structures/doublyLinkedList.js');

var HashTable = function(max) {
  this.array = new Array(max);
  for (var i = 0; i < max; i++) {
    this.array[i] = new linkedList();
  }
  this.max = max;
  this.length = 0;
}

HashTable.prototype.hash = function(key) {
  return hash(key, this.max);
}

HashTable.prototype.get = function(key) {
  var index = this.hash(key);

  var node = this.array[index].head
  while(node) {
    if (node.key === key) {
      return node.value;
    }
    node = node.next
  }
  return null;
}

HashTable.prototype.put = function(key, value) {
  var index = this.hash(key);
  if (!this.array[index]) {
    this.array[index] = new linkedList();
  }

  var node = this.array[index].head
  while(node) {
    if (node.key === key) {
      node.value = value;
      return;
    }
    node = node.next
  }
  this.array[index].addToTail(key, value);
  this.length++;
}

HashTable.prototype.delete = function(key) {
  var index = this.hash(key);
  var prev = null;
  var node = this.array[index].head;
  while(node) {
    if (node.key === key) {
      this.array[index].delete(node, prev);
      this.length--;
    }
    prev = node;
    node = node.next
  }
  return null;
}

var Node = function(key, value) {
  this.key = key;
  this.value = value;
  this.prev = null;
  this.after = null;
}

var LFU = function(max) {
  this.map = new HashTable(max);
  this.head = null;
  this.tail = null;
  this.max = max;
}

LFU.prototype.set = function(key, value) {
  var node = new Node(key, value);
  var find = this.map.get(key);
  if (find) {
    find.value = value;
    if (find === this.tail && find !== this.head) {
      find.prev.after = null;
      this.tail = find.prev;
      find.prev = null;
      find.after = this.head;
      this.head.prev = find;
      this.head = find;
    } else if (find !== this.head) {
      find.prev.after = find.after;
      find.after.prev = find.prev;
      find.prev = null;
      find.after = this.head;
      this.head.prev = find;
      this.head = find;
    }
  } else {
    this.map.put(key, node);
    if (this.head) {
      node.after = this.head;
      this.head.prev = node;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    if (this.map.length > this.max) {
      this.map.delete(this.tail.key);
      this.tail.prev.after = null;
      this.tail = this.tail.prev;
    }
  }
}

LFU.prototype.get = function(key) {
  var find = this.map.get(key);
  if (find) {
    if (find === this.tail && find !== this.head) {
      find.prev.after = null;
      this.tail = find.prev;
      find.prev = null;
      find.after = this.head;
      this.head.prev = find;
      this.head = find;
    } else if (find !== this.head) {
      find.prev.after = find.after;
      find.after.prev = find.prev;
      find.prev = null;
      find.after = this.head;
      this.head.prev = find;
      this.head = find;
    }
    return find.value
  } else {
    return find;
  }
}

var test = new LFU(3);
// test.set('b',2);
test.set('d',8);
test.set('c',4);
test.set('f',2);
test.set('i',8);
