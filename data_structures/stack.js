var Node = function(value) {
  this.value = value;
  this.next = null;
}

var Stack = function() {
  this.first = null;
  this.length = 0;
}

Stack.prototype.push = function(value) {
  if (this.first === null) {
    this.first = new Node(value);
  } else {
    var oldFirst = this.first;
    this.first = new Node(value);
    this.first.next = oldFirst;
  }
  this.length++;
}

Stack.prototype.pop = function() {
  if (this.first === null) {
    return null;
  } else {
    var oldFirst = this.first;
    this.first = this.first.next;
    this.length--;
    return oldFirst.value;
  }
}

Stack.prototype.isEmpty = function(value) {
  return this.length == 0;
}

Stack.prototype.size = function() {
  return this.length;
}

Stack.prototype.forEach = function(callback) {
  var current = this.first;
  while (current !== null) {
    callback(current);
    current = current.next;
  }
}

var test = new Stack();
test.push(1);
test.push(2);
test.push(3);
// console.log(test.pop())
// console.log(test.size())
// console.log(test.isEmpty())
//
// console.log(test);

module.exports = Stack;
