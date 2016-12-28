var merge = function(array, lo, mid, hi) {
  var auxArray = [];
  var i = lo;
  var j = mid + 1;
  for (var k = lo; k <= hi; k++) {
    auxArray[k] = array[k];
  }

  for (var k = lo; k <= hi; k++) {
    if (i > mid) {
      array[k] = auxArray[j];
      j++;
    } else if (j > hi) {
      array[k] = auxArray[i];
      i++;
    } else if (auxArray[i] < auxArray[j]) {
      array[k] = auxArray[i];
      i++;
    } else {
      array[k] = auxArray[j];
      j++;
    }
  }
}

var mergeSortBottomUp = function(array) {
  for (var i = 1; i < array.length; i = 2 * i ) {
    for (var j = 0; j < array.length - i; j = j + i * 2) {
      merge(array, j, j + i - 1, Math.min(j + 2*i -1, array.length - 1))
    }
  }

  return array;
}
console.log(mergeSortBottomUp([9,8,7,6,5,4,3,2,1,0]));
console.log(mergeSortBottomUp(['m','e','r','g','e','s','o','r','t','e','x','a','m','p','l','e']));
