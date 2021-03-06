var Node = function(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

var linkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

linkedList.prototype.delete = function(node, prev) {

  if (this.head === this.tail && this.tail === node) {
    this.head = this.tail = null;
  } else if (this.head === node) {
    this.head = node.next;
    node.next = null;
  } else if (this.tail === node) {
    this.tail = prev;
    this.tail.next = null;
  } else {
    prev.next = node.next;
    node.next = null;
  }
  this.length--;
}

linkedList.prototype.addToHead = function(key, value) {
  if (this.isEmpty()) {
    this.head = new Node(key, value);
    this.tail = this.head;
  } else {
    var oldHead = this.head;
    this.head = new Node(key, value);
    this.head.next = oldHead;
  }
  this.length++;
}

linkedList.prototype.addToTail = function(key, value) {
  if (this.isEmpty()) {
    this.head = new Node(key, value);
    this.tail = this.head;
  } else {
    this.tail.next = new Node(key, value);
    this.tail = this.tail.next;
  }
  this.length++;
}

linkedList.prototype.removeHead = function() {
  if (this.isEmpty()) {
    return null;
  } else {
    var oldHead = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.isEmpty()) {
      this.tail = this.head;
    }
    return oldHead;
  }
}

linkedList.prototype.findNode = function(value) {
  var current = this.head;
  while (current !== null) {
    if (current.value === value) {
      return current;
    }
    current = current.next;
  }
  return null;
}

linkedList.prototype.isEmpty = function() {
  return this.length == 0;
}

linkedList.prototype.size = function() {
  return this.length;
}

linkedList.prototype.forEach = function(callback) {
  var current = this.head;
  while (current !== null) {
    callback(current);
    current = current.next;
  }
}

var test = new linkedList();
test.addToTail(1);
test.addToTail(2);
test.addToTail(3);
test.removeHead();
test.addToTail(4);
test.addToTail(5);
test.addToHead(6);
test.addToHead(7);

// console.log(test);

module.exports = linkedList;
