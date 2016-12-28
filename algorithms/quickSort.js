var partition = function(array, lo, hi) {
  var i = lo;
  var j = hi + 1;
  var key = array[lo];
  while (true) {
    while (array[++i] < key) {
      if (i == hi) { break; }
    }
    while (array[--j] > key) {
      if (j == lo) { break; }
    }
    if (i >= j) { break; }

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  var temp2 = array[lo];
  array[lo] = array[j];
  array[j] = temp2;
  return j;
}

var sort = function(array, lo, hi) {
  if (hi <= lo) { return; }
  var j = partition(array, lo, hi);
  sort(array, lo, j-1);
  sort(array, j+1, hi);
}


var quickSort = function(array) {
  sort(array, 0, array.length -1);
  return array;
}

console.log(quickSort(['k','r','a','t','e','l','e','p','u','i','m','q','c','x','o','s']));
