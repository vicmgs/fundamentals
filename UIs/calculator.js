var $screen = $('.screen');
var $nums = $('.num');
var $ops = $('.op');
var result = 0;
var prevOp = null;

var doMath = function(a, b, op) {
  if (op === '+') {
    return a + b;
  } else if (op === '-') {
    return a - b;
  } else if (op === '*') {
    return a * b;
  } else if (op === '/') {
    return a / b;
  }
}

$nums.on('click', function(e) {
  var exp = $screen.text();
  exp = exp + e.target.innerText;
  $screen.text(exp);
})

$ops.on('click', function(e) {
  if (e.target.innerText === '='){
    if (prevOp && $screen.text() !== '') {
      result = doMath(result, Number($screen.text()), prevOp);
      $screen.text(result);
      prevOp = null;
    }
  } else if (e.target.innerText === 'AC'){
    $screen.text('');
    result = 0;
    prevOp = null;
  } else {
    if (!prevOp && $screen.text() !== '') {
      result = Number($screen.text());
      $screen.text('');
    } else if (prevOp && $screen.text() !== ''){
      result = doMath(result, Number($screen.text()), prevOp);
      $screen.text('');
    }

    if (e.target.innerText === '+') {
      prevOp = '+';
    } else if (e.target.innerText === '-') {
      prevOp = '-';
    } else if (e.target.innerText === '*') {
      prevOp = '*';
    } else if (e.target.innerText === '/') {
      prevOp = '/';
    }
  }
});
