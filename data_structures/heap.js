var Heap = function() {
  this.values = [];
};

Heap.prototype.add = function(value) {
  var data = this.values;
  data.push(value);
  var index = data.length - 1;

  while (value > data[Math.floor((index - 1) / 2)] && index > 0) {
    var temp = data[index];
    data[index] = data[Math.floor((index - 1) / 2)];
    data[Math.floor((index - 1) / 2)] = temp;
    index = Math.floor((index - 1) / 2);
  }
}

Heap.prototype.rmRoot = function() {
  if (this.isEmpty()) {
    return null;
  }

  var data = this.values;
  var root = data[0];
  data[0] = data[data.length-1];
  data.pop();
  var index = 0;

  while (data[index] < data[(index + 1) * 2] || data[index] < data[((index + 1) * 2) - 1]) {
    if (data[(index + 1) * 2] > data[((index + 1) * 2) - 1]) {
      var temp = data[index];
      data[index] = data[(index + 1) * 2];
      data[(index + 1) * 2] = temp;
      index = (index + 1) * 2;
    } else {
      var temp = data[index];
      data[index] = data[((index + 1) * 2) - 1];
      data[(index + 1) * 2 - 1] = temp;
      index = (index + 1) * 2 - 1;
    }
  }

  return root;
}

Heap.prototype.size = function() {
  return this.values.length;
}

Heap.prototype.isEmpty = function() {
  return this.values.length == 0;
}

var test = new Heap();
var numbers = [35,33,42,10,14,19,27,44,26,31];
numbers.forEach(function(num) {
  test.add(num);
});
test.rmRoot();
console.log(test);
