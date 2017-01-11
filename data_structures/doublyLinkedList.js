var Node = function(value) {
  this.value = value;
  this.next = null;
  this.previous = null;
}

var doublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

doublyLinkedList.prototype.addToHead = function(value) {
  if (this.isEmpty()) {
    this.head = new Node(value);
    this.tail = this.head;
  } else {
    var oldHead = this.head;
    this.head = new Node(value);
    this.head.next = oldHead;
    oldHead.previous = this.head;
  }
  this.length++;
  return this.head;
}

doublyLinkedList.prototype.moveToHead = function(node) {
  if (this.tail.value === node) {
    node.previous.next = null;
    this.tail = node.previous;
    node.previous = null;
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
  } else if (node !== this.head.value) {
    node.next.previous = node.previous;
    node.previous.next = node.next;
    node.previous = null;
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
  }
}

doublyLinkedList.prototype.addToTail = function(value) {
  if (this.isEmpty()) {
    this.head = new Node(value);
    this.tail = this.head;
  } else {
    this.tail.next = new Node(value);
    this.tail.next.previous = this.tail;
    this.tail = this.tail.next;
  }
  this.length++;
  return this.tail;
}

// doublyLinkedList.prototype.removeHead = function() {
//   if (this.isEmpty()) {
//     return null;
//   } else {
//     var oldHead = this.head;
//     this.head = this.head.next;
//     this.length--;
//     if (this.isEmpty()) {
//       this.tail = this.head;
//     } else {
//       this.head.previous = null;
//     }
//     return oldHead;
//   }
// }

// doublyLinkedList.prototype.removeTail = function() {
//   if (this.isEmpty()) {
//     return null;
//   } else {
//     var oldTail = this.tail;
//     this.tail = this.tail.previous;
//     this.length--;
//     if (this.isEmpty()) {
//       this.head = this.tail;
//     } else {
//       this.tail.next = null;
//     }
//     return oldTail;
//   }
// }
//
// doublyLinkedList.prototype.findNode = function(value) {
//   var current = this.head;
//   while (current !== null) {
//     if (current.value === value) {
//       return current;
//     }
//     current = current.next;
//   }
//   return null;
// }
//
doublyLinkedList.prototype.isEmpty = function(value) {
  return this.length == 0;
}

doublyLinkedList.prototype.size = function() {
  return this.length;
}
//
// doublyLinkedList.prototype.forEach = function(callback) {
//   var current = this.head;
//   while (current !== null) {
//     callback(current);
//     current = current.next;
//   }
// }

var test = new doublyLinkedList();


module.exports = doublyLinkedList;
