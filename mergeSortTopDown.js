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

var sort = function(array, lo, hi) {
  if (lo >= hi) { return; }
  var mid = Math.floor(lo + (hi - lo) / 2);
  sort(array, lo, mid);
  sort(array, mid + 1, hi);
  merge(array, lo, mid, hi);
}

var mergeSortTopDown = function(array) {
  sort(array, 0, array.length - 1);
  return array;
}
console.log(mergeSortTopDown(['g','e','a']));
console.log(mergeSortTopDown(['m','e','r','g','e','s','o','r','t','e','x','a','m','p','l','e']));
