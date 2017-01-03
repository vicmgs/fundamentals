var index = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12
  ,n:13,o:14,p:15,q:16,r:17,s:18,t:19,u:20,v:21,w:22,x:23,y:24,z:25, length: 26};
var revIndex = 'abcdefghijklmnopqrstuvwxyz'.split('');

var TenaryST = function() {
  this.root = null;
  this.size = 0;
}

var Node = function() {
  this.char = null;
  this.left = null;
  this.right = null;
  this.mid = null;
  this.value = null;
}

TenaryST.prototype.get = function(key) {
  var get = function(node, key, d) {
    if (!node) {
      return null;
    }
    if (node.char === key[d] && d === key.length-1) {
      return node.value;
    }

    if (key[d] < node.char) {
      return get(node.left, key, d);
    } else if (key[d] > node.char) {
      return get(node.right, key, d);
    } else {
      return get(node.mid, key, d+1);
    }
  }
  return get(this.root, key, 0);
}

TenaryST.prototype.put = function(key, value) {
  var put = function(node, key, value, d) {
    if (!node) {
      node = new Node();
      node.char = key[d];
    }
    if (node.char === key[d] && d === key.length-1) {
      node.value = value;
      return node;
    }

    if (key[d] < node.char) {
      node.left = put(node.left, key, value, d);
    } else if (key[d] > node.char) {
      node.right = put(node.right, key, value, d);
    } else {
      node.mid = put(node.mid, key, value, d+1);
    }
    return node;
  }
  this.root = put(this.root, key, value, 0);
}

TenaryST.prototype.keysWithPrefix = function(key) {
  var collect = function(node, pre, key, d) {
    if (!node) {
      return;
    }

    if (d <= key.length-1) {
      if (key[d] < node.char) {
        collect(node.left, pre, key, d);
      } else if (key[d] > node.char) {
        collect(node.right, pre, key, d);
      } else {
        if (d === key.length-1 && node.value) setKeys.push(pre + key[d]);
        collect(node.mid, pre + key[d], key, d+1);
      }
    } else {
      if (node.value) setKeys.push(pre + node.char);
      collect(node.mid, pre + node.char, key, d+1);
      collect(node.left, pre, key, d);
      collect(node.right, pre, key, d);
    }
    return;
  }
  var setKeys = [];
  collect(this.root, '', key, 0);
  return setKeys;
}

TenaryST.prototype.keysThatMatch = function(pat) {
  var collect = function(node, pre, key, d) {
    if (!node || d > key.length-1) {
      return;
    }

    if (key[d] === '.') {
      if (d === key.length-1 && node.value) setKeys.push(pre + node.char);
      collect(node.left, pre, key, d);
      collect(node.right, pre, key, d);
      collect(node.mid, pre + node.char, key, d+1);
    } else if (key[d] < node.char) {
      collect(node.left, pre, key, d);
    } else if (key[d] > node.char) {
      collect(node.right, pre, key, d);
    } else {
      if (d === key.length-1 && node.value) setKeys.push(pre + node.char);
      collect(node.mid, pre + node.char, key, d+1);
    }
    return;
  }
  var setKeys = [];
  collect(this.root, '', pat, 0);
  return setKeys;
}

TenaryST.prototype.longestPrefixOf = function(key) {
  var collect = function(node, pre, key, d) {
    if (!node || d > key.length-1) {
      return;
    }

    if (key[d] < node.char) {
      collect(node.left, pre, key, d);
    } else if (key[d] > node.char) {
      collect(node.right, pre, key, d);
    } else {
      if (node.value) {
        longestKey = pre + key[d];
      }
      collect(node.mid, pre + key[d], key, d+1);
    }
    return;
  }
  var longestKey = null;
  collect(this.root, '', key, 0);
  return longestKey;
}

TenaryST.prototype.remove = function(key) {
  var rm = function(node, key, d) {
    if (!node) {
      return null;
    }
    if (key[d] < node.char) {
      node.left = rm(node.left, key, d);
    } else if (key[d] > node.char) {
      node.right = rm(node.right, key, d);
    } else {
      if (d === key.length-1) {
        node.value = null;
      } else {
        node.mid = rm(node.mid, key, d+1);
      }
      if (!node.left && !node.right && !node.mid) {
        return null;
      } else if (node.left && !node.mid) {
        return node.left;
      } else if (node.right && !node.mid) {
        return node.right;
      }
    }
    return node;
  }
  this.root = rm(this.root, key, 0);
}

var test = new TenaryST();
test.put('shell',3);
test.put('shill',1.5);
test.put('shall',1.7);
test.put('are',4);
test.put('by',7);
test.put('fire',9);
console.log(test.get('shill'));
console.log(test.longestPrefixOf('shelly'));
console.log(test.keysWithPrefix('sh'));
console.log(test.keysThatMatch('.....'));
console.log(test.keysThatMatch('sh.ll'));
console.log(test.root);
