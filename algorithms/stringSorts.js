var lsdSort = function(strings, chars) {
  var aux = [];
  var radix = 10;
  var count;

  for (var i = chars-1; i >= 0; i--) {
    count = [];
    for (var j = 0; j <= radix; j++) {
      count[j] = 0;
    }
    for (var j = 0; j < strings.length; j++) {
      count[Number(strings[j][i])+1]++;
    }
    for (var j = 0; j < radix; j++) {
      count[j+1] += count[j];
    }
    for (var j = 0; j < strings.length; j++) {
      aux[count[strings[j][i]]++] = strings[j];
    }
    for (var j = 0; j < strings.length; j++) {
      strings[j] = aux[j]
    }
  }
  return strings;
}

var strings = [ '9876', '8765', '7654', '6543', '5432', '4321', '3210'];
console.log(lsdSort(strings, 4));
