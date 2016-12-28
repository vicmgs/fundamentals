var selectionSort = function(array) {
  for (var i = 0; i < array.length; i++) {
    var minIndex = i;

    for (var j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    var temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}

console.log(selectionSort([1,6,3,5,7,8,2]));
console.log(selectionSort(['z', 'a', 't', 'c', 'f', 'v']));
