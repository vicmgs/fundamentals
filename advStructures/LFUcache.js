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
  this.freq = null;
}

var LFU = function(max) {
  this.map = new HashTable(max);
  this.freqs = new doublyLinkedList();
  this.max = max;
}

LFU.prototype.set = function(key, value) {
  var node = new Node(key, value);
  var find = this.map.get(key);
  if (find) {
    find.value = value;

    var count = find.freq.freq + 1;
    if (!find.freq.next || find.freq.next.freq !== count) {
      var newFreq = doublyLinkedList.prototype.addAfter(find.freq, count);

      if (!find.prev && !find.after) {
        find.freq.head = find.freq.tail = null;
        newFreq.head = newFreq.tail = find;
      } else if (!find.prev && find.after) {
        find.freq.head = find.after;
        find.after.prev = null;
        newFreq.head = newFreq.tail = find;
        find.after = null;
        find.freq = newFreq;
      } else if (find.prev && !find.after) {
        find.freq.tail = find.prev;
        find.prev.after = null;
        find.prev = null;
        newFreq.head = newFreq.tail = find;
        find.freq = newFreq;
      } else if (find.prev && find.after) {
        find.prev.after = find.after;
        find.after.prev = find.prev;
        find.prev = find.after = null;
        newFreq.head = newFreq.tail = find;
        find.freq = newFreq;
      }
    } else {
      newFreq = find.freq.next;

      if (!find.prev && !find.after) {
        find.freq.head = find.freq.tail = null;
        newFreq.tail.after = find;
        find.prev = newFreq.tail;
        find.freq = newFreq;
        newFreq.tail = find;
      } else if (!find.prev && find.after) {
        find.freq.head = find.after;
        find.after.prev = null;
        find.after = null;
        newFreq.tail.after = find;
        find.prev = newFreq.tail;
        find.freq = newFreq;
        newFreq.tail = find;
      } else if (find.prev && !find.after) {
        find.freq.tail = find.prev;
        find.prev.after = null;
        find.prev = null;
        newFreq.tail.after = find;
        find.prev = newFreq.tail;
        find.freq = newFreq;
        newFreq.tail = find;
      } else if (find.prev && find.after) {
        find.prev.after = find.after;
        find.after.prev = find.prev;
        find.prev = find.after = null;
        newFreq.tail.after = find;
        find.prev = newFreq.tail;
        find.freq = newFreq;
        newFreq.tail = find;
      }
    }
  } else {
    this.map.put(key, node);

    if (!this.freqs.head || this.freqs.head.freq !== 1) {
      this.freqs.addToHead(1);
      node.freq = this.freqs.head;
      this.freqs.head.head = node;
      this.freqs.head.tail = node;
    } else {
      this.freqs.head.tail.after = node;
      node.prev = this.freqs.head.tail;
      this.freqs.head.tail = node;
      node.freq = this.freqs.head;
    }
  }
}

// LFU.prototype.get = function(key) {
//   var find = this.map.get(key);
//   if (find) {
//
//   } else {
//     return find;
//   }
// }

var test = new LFU(3);
test.set('a',1);
test.set('b',2);
test.set('c',3);
test.set('d',5);
test.set('b',3);
test.set('c',10);
// console.log(test.freqs.head)
// console.log(test.freqs.head)
// test.set('a',4);
// console.log(test.freqs.head.next);
// console.log('..........');
// console.log(test.map.array);
