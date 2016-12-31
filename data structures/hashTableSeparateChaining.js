var hash = require('./hashingFunction.js');
var linkedList = require('./linkedList.js');

var hashTableSC = function() {
  this.array = [];
}

hashTableSC.prototype.hash = function(key) {
  return hash(key, 7);
}

hashTableSC.prototype.get = function(key) {
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

hashTableSC.prototype.put = function(key, value) {
  var index = this.hash(key);
  if (this.array[index] === undefined) {
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
}

var test = new hashTableSC;
test.put('a', 1);
test.put('b', 2);
test.put('c', 3);
test.put('d', 4);
test.put('e', 5);
test.put('f', 6);
test.put('g', 7);
test.put('h', 8);
test.put('i', 9);
console.log(test.get('i'));
console.log(test.get('h'));
console.log(test.array);
