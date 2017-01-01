var symbolTable = function() {
  this.keys = [];
  this.values = [];
};

symbolTable.prototype.rank = function(key, lo, hi) {
  if (lo > hi) {
    return lo;
  }

  var mid = Math.floor(lo + (hi - lo) / 2);
  if (this.keys[mid] > key) {
    return this.rank(key, lo, mid-1);
  } else if (this.keys[mid] < key) {
    return this.rank(key, mid+1, hi);
  } else {
    return mid;
  }
};

symbolTable.prototype.get = function(key) {
  var index = this.rank(key, 0, this.keys.length-1);
  if (this.keys.length == 0 || index > this.keys.length-1 || this.keys[index] !== key) {
    return null;
  } else {
    return this.values[index];
  }
};

symbolTable.prototype.put = function(key, value) {
  value = value || null;
  var index = this.rank(key, 0, this.keys.length-1);
  if (index > this.keys.length-1) {
    this.keys.push(key);
    this.values.push(value);
  } else if (this.keys[index] !== key) {
    for (var i = this.keys.length-1; i >= index; i--) {
      this.keys[i+1] = this.keys[i];
      this.values[i+1] = this.values[i];
    }
    this.keys[index] = key;
    this.values[index] = value;
  } else {
    this.values[index] = value;
  }
};

symbolTable.prototype.delete = function(key) {
  var index = this.rank(key, 0, this.keys.length-1);
  if (this.keys.length == 0 || index > this.keys.length-1 || this.keys[index] !== key) {
    return null;
  } else {
    for (var i = index; i < this.keys.length-1; i++) {
      this.keys[i] = this.keys[i+1];
      this.values[i] = this.values[i+1];
    }
    this.keys.pop();
    this.values.pop();
  }
};

var test = new symbolTable();
test.put('b',2);
test.put('d');
test.put('e',5);
test.put('g',10);
test.put('a',1);
test.put('c',4);
test.put('f',11);
test.put('h','end');
console.log(test);
test.delete('a');
test.delete('e');
test.delete('h');
test.delete(null);
console.log(test);
