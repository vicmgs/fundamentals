var Node = function(value) {
  this.value = value;
  this.next = null;
}

var Bag = function() {
  this.first = null;
  this.length = 0;
}

Bag.prototype.add = function(value) {
  if (this.first === null) {
    this.first = new Node(value);
  } else {
    var oldFirst = this.first;
    this.first = new Node(value);
    this.first.next = oldFirst;
  }
  this.length++;
}

Bag.prototype.isEmpty = function(value) {
  return this.length == 0;
}

Bag.prototype.size = function() {
  return this.length;
}

Bag.prototype.forEach = function(callback) {
  var current = this.first;
  while (current !== null) {
    callback(current);
    current = current.next;
  }
}

var test = new Bag();
test.add(1);
test.add(2);
test.add(3);
console.log(test.size())
console.log(test.isEmpty())

console.log(test);
