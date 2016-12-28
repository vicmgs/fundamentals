var insertionSort = function(array) {
  for (var i = 1; i < array.length; i++) {
    for (var j = i; j > 0 && array[j] < array[j-1]; j--) {
      var temp = array[j-1];
      array[j-1] = array[j];
      array[j] = temp;
    }
  }
  return array;
}

console.log(insertionSort([1,6,3,5,7,8,2]));
console.log(insertionSort(['z', 'a', 't', 'c', 'f', 'v']));
