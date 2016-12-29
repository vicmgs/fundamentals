var heapSort = function(array) {
  buildHeapSink(array);
  // buildHeapSwim(array); not as efficient
  sort(array);
  return array;
};

var sort = function(array) {
  var index;

  for (var i = array.length-1; i > 0; i--) {
    var temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    index = 0;
    // console.log(array[index]);
    while (array[index] < array[(index + 1) * 2] || array[index] < array[((index + 1) * 2) - 1]) {
      if ((index + 1) * 2 - 1 >= i) {
        break;
      } else if ((index + 1) * 2 >= i) {
        break;
      }

      if (array[(index + 1) * 2] > array[((index + 1) * 2) - 1]) {
        var temp = array[index];
        array[index] = array[(index + 1) * 2];
        array[(index + 1) * 2] = temp;
        index = (index + 1) * 2;
      } else {
        var temp = array[index];
        array[index] = array[((index + 1) * 2) - 1];
        array[(index + 1) * 2 - 1] = temp;
        index = (index + 1) * 2 - 1;
      }
    }
  }
}

var buildHeapSwim = function(array) {
  var index;

  for (var i = 1; i < array.length; i++) {
    index = i;
    while (array[index] > array[Math.floor((index - 1) / 2)] && index > 0) {
      var temp = array[index];
      array[index] = array[Math.floor((index - 1) / 2)];
      array[Math.floor((index - 1) / 2)] = temp;
      index = Math.floor((index - 1) / 2);
    }
  }
};

var buildHeapSink = function(array) {
  var index;
  for (var i = Math.floor((array.length - 1) / 2); i >= 0; i--) {
    index = i;
    while (array[index] < array[(index + 1) * 2] || array[index] < array[((index + 1) * 2) - 1]) {
      if (array[(index + 1) * 2] > array[((index + 1) * 2) - 1]) {
        var temp = array[index];
        array[index] = array[(index + 1) * 2];
        array[(index + 1) * 2] = temp;
        index = (index + 1) * 2;
      } else {
        var temp = array[index];
        array[index] = array[((index + 1) * 2) - 1];
        array[(index + 1) * 2 - 1] = temp;
        index = (index + 1) * 2 - 1;
      }
    }
  }
};


var numbers = [35,33,42,10,14,19,27,44,26,31];
var test = 'sortexample'.split('');
console.log(heapSort(numbers));
console.log(heapSort(test));
