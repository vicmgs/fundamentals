var sort = function(array, lo, hi) {
  if (hi <= lo) { return; }
  var lt = lo;
  var i = lo + 1;
  var gt = hi;
  var key = array[lo];

  while(i <= gt) {
    if (array[i] < key) {
      var temp = array[lt];
      array[lt] = array[i];
      array[i] = temp;
      i++;
      lt++;
    } else if (array[i] > key) {
      var temp = array[gt];
      array[gt] = array[i];
      array[i] = temp;
      gt--;
    } else {
      i++
    }
  }
  sort(array, lo, lt-1);
  sort(array, gt+1, hi);
}


var quickSort3Way = function(array) {
  sort(array, 0, array.length -1);
  return array;
}

console.log(quickSort3Way(['r','b','w','w','r','w','b','r','r','w','b','r']));
console.log(quickSort3Way(['k','r','a','t','e','l','e','p','u','i','m','q','c','x','o','s']));
