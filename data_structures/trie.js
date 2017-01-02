var Queue = require('./queue.js');
var index = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12
  ,n:13,o:14,p:15,q:16,r:17,s:18,t:19,u:20,v:21,w:22,x:23,y:24,z:25, length: 26};
var revIndex = 'abcdefghijklmnopqrstuvwxyz'.split('');

var Trie = function() {
  this.root = new Node();
  this.size = 0;
}

var Node = function() {
  this.value = null;
  this.next = new Array(26);
  for (var i = 0; i < this.next.length; i++) {
    this.next[i] = null;
  }
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
  this.size++;
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

Trie.prototype.remove = function(key) {
  var rm = function(node, key, id) {
    if (!node) { return null; }
    if (id === key.length ) { node.value = null; }
    else {
      node.next[index[key[id]]] = rm(node.next[index[key[id]]], key, id+1);
    }

    if (node.value !== null) return node;

    for (var c = 0; c < revIndex.length; c++) {
      if (node.next[c]) return node;
    }
    return null;
  }
  return rm(this.root, key, 0);
}

var test = new Trie();
test.put('shell',1);
test.put('shill',1.5);
test.put('shall',1.7);
test.put('shells',2);
test.put('shellsort',3);
test.put('are',4);
test.put('by',7);
test.put('fire',9);
console.log(test.keysWithPrefix('she'));
console.log(test.keysThatMatch('...ll'));
console.log(test.longestPrefixOf('byst'));
console.log(test.longestPrefixOf('areyouready'));
console.log(test.size);
test.remove('shell');
console.log(test.keysWithPrefix('she'));
