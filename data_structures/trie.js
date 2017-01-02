var Queue = require('./queue.js');
var index = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12
  ,n:13,o:14,p:15,q:16,r:17,s:18,t:19,u:20,v:21,w:22,x:23,y:24,z:25, length: 26};
var revIndex = 'abcdefghijklmnopqrstuvwxyz'.split('');

var Trie = function() {
  this.root = new Node();
}

var Node = function() {
  this.value = null;
  this.next = new Array(26);
}

Trie.prototype.get = function(key) {
  var get = function(node, key, id) {
    if (!node) { return null; }
    if (id === key.length) { return node; }
    var link = index[key[id]];
    return get(node.next[link], key, id+1);
  }
  return get(this.root, key, 0);
}

Trie.prototype.put = function(key, value) {
  var put = function(node, key, value, id) {
    if (!node) { node = new Node(); }
    if (id === key.length) { node.value = value; return node; }
    var link = index[key[id]];
    node.next[link] = put(node.next[link], key, value, id+1);
    return node;
  }
  return put(this.root, key, value, 0);
}

Trie.prototype.keysWithPrefix = function(pre) {
  var collect = function(node, pre, q) {
    if (!node) { return; }
    if (node.value !== null) { q.enqueue(pre); }
    for (var c = 0; c < index.length; c++) {
      collect(node.next[c], pre + revIndex[c], q);
    }
  }
  var q = new Queue();
  collect(this.get(pre), pre, q);
  return q;
}

Trie.prototype.keysThatMatch = function(pat) {
  var collect = function(node, pre, pat, q, id) {
    if (!node) { return; }
    if (node.value !== null && id === pat.length) { q.enqueue(pre); }
    for (var c = 0; c < index.length; c++) {
      if (revIndex[c] === pat[id] || pat[id] === '.') {
        collect(node.next[c], pre + revIndex[c], pat, q, id+1);
      }
    }
  }
  var q = new Queue();
  collect(this.root, '', pat, q, 0);
  return q;
}

Trie.prototype.longestPrefixOf = function(key) {
  var search = function(node, pre, key, id) {
    if (!node) { return; }
    if (node.value !== null ) { lastKey = pre; }
    for (var c = 0; c < index.length; c++) {
      if (revIndex[c] === key[id]) {
        search(node.next[c], pre + revIndex[c],key, id+1);
      }
    }
  }
  var lastKey = null;
  search(this.root, '', key, 0);
  return lastKey;
}

var test = new Trie();
test.put('shell',1);
test.put('shill',1.5);
test.put('shall',1.7);
test.put('shells',2);
test.put('shellsort',3);
test.put('are',3);
test.put('by',3);
console.log(test.keysWithPrefix('shell'));
console.log(test.keysThatMatch('...ll'));
console.log(test.longestPrefixOf('byst'));
console.log(test.longestPrefixOf('areyouready'));