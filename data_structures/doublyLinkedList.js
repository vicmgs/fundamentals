var Node = function(freq) {
  this.freq = freq;
  this.head = null;
  this.tail = null;
  this.next = null;
  this.previous = null;
}

var doublyLinkedList = function() {
  this.head = null;

}

doublyLinkedList.prototype.addToHead = function(value) {
  if (!this.head) {
    this.head = new Node(value);

  } else {
    var oldHead = this.head;
    this.head = new Node(value);
    this.head.next = oldHead;
    oldHead.previous = this.head;
  }
}

doublyLinkedList.prototype.addAfter = function(node, freq) {
  var temp = new Node(freq);
  if (node.next) {
    node.next.previous = temp;
    temp.next = node.next;
    node.next = temp;
    temp.previous = node;
  } else {
    node.next = temp;
    temp.previous = node;

  }
  return temp;
}

doublyLinkedList.prototype.removeCurr = function(node) {
  if (this.head === node && !node.next) {
    this.head = null;

  } else if (this.head === node) {
    this.head = node.next;
    this.head.previous = null;
  } else if (node.next) {
    node.next.previous = node.previous;
    node.previous.next = node.next;
  } else {
    node.previous.next = null;

  }
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



module.exports = doublyLinkedList;
