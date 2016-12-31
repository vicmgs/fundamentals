var hash = require('./hashingFunction.js');

var hashTableLP = function(max) {
  this.keys = [];
  this.values = [];
  this.max = max;
}

hashTableLP.prototype.hash = function(key) {
  return hash(key, this.max);
}

hashTableLP.prototype.get = function(key) {
  var index = this.hash(key);
  while(this.keys[index] && this.keys[index] !== key) {
    if (index === this.max-1) {
      index = 0;
    } else {
      index++;
    }
  }
  return this.values[index];
}

hashTableLP.prototype.put = function(key, value) {
  var index = this.hash(key);
  while(this.keys[index] && this.keys[index] !== key) {
    if (index === this.max-1) {
      index = 0;
    } else {
      index++;
    }
  }
  this.keys[index] = key;
  this.values[index] = value;
}

var test = new hashTableLP(8);
test.put('test', 1);
test.put('test2', 2);
test.put('test3', 2);
test.put('test3', 4);
test.put('test5', 8);
test.put('test11', 11);
test.put('test11', 12);

console.log(test);
console.log(test.get('test11'));
