var Node = function(value) {
  this.value = value;
  this.next = null;
}

var Queue = function() {
  this.first = null;
  this.last = null;
  this.length = 0;
}

Queue.prototype.enqueue = function(value) {
  if (this.first === null) {
    this.first = new Node(value);
    this.last = this.first;
  } else {
    this.last.next = new Node(value);
    this.last = this.last.next;
  }
  this.length++;
}

Queue.prototype.dequeue = function() {
  if (this.first === null) {
    return null;
  } else {
    var oldFirst = this.first;
    this.first = this.first.next;
    this.length--;
    if (this.length === 0) {
      this.last = null;
    }
    return oldFirst.value;
  }
}

Queue.prototype.isEmpty = function(value) {
  return this.length == 0;
}

Queue.prototype.size = function() {
  return this.length;
}

Queue.prototype.forEach = function(callback) {
  var current = this.first;
  while (current !== null) {
    callback(current);
    current = current.next;
  }
}

var test = new Queue();
test.enqueue(1);
test.enqueue(2);
test.enqueue(3);
console.log(test.dequeue())
console.log(test.size())
console.log(test.isEmpty())

console.log(test);
