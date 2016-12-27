shellSort = function(array) {
  var h = 1;
  while (h < array.length / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (var i = h; i < array.length; i++) {
      for (var j = i; j >= h && array[j] < array[j-h]; j-=h) {
        var temp = array[j];
        array[j] = array[j-h];
        array[j-h] = temp;
      }
    }
    h = Math.floor(h / 3);
  }

  return array;
}

console.log(shellSort([1,6,3,5,7,8,2,]));
console.log(shellSort(['s','h','e','l','l','s','o','r','t','e','x','a','m','p','l','e']));
