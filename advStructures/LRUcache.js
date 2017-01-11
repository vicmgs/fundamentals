var Node = function(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
  this.after = null;
  this.before = null;
}

var LRUcache = function(max) {
  this.values = new Array(max);
  for (var i = 0; i < this.values.length; i++) {
    this.values[i] = null;
  }
  this.max = max;
  this.head = null;
  this.tail = null;
  this.length = 0;
}

LRUcache.prototype.hash = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

LRUcache.prototype.find = function(key) {
  var index = this.hash(key, this.max);
  var node = this.values[index];
  var prev = null;

  if (node) {
    while (node) {
      if (node.key === key) {
        return {node: node, prev: prev, found: true};
      }
      prev = node;
      node = node.next;
    }

  }
  return {found: false, node: prev};
}

LRUcache.prototype.set = function(key, value) {
  var index = this.hash(key, this.max);
  var node = this.values[index];
  var result = this.find(key);

  var newNode = new Node(key,value);

  if (result.found) {
    result.node.value = value;
    if (this.head !== result.node) {
      if (this.tail === result.node) {
        this.tail = result.node.before;
        this.tail.after = null;
      } else {
        result.node.before.after = result.node.after;
        result.node.after.before = result.node.before;
      }
      result.node.before = null;
      result.node.after = this.head;
      this.head.before = result.node;
      this.head = result.node;
    }
  } else {
    if (result.node) {
      result.node.next = newNode;
      newNode.prev = result.node;
    } else {
      this.values[index] = newNode;
    }
    this.length++;

    if (this.head) {
      this.head.before = newNode;
      newNode.after = this.head;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    if (this.length > this.max) {
      if (this.tail.prev) {
        this.tail.prev.next = this.tail.next;
        if (this.tail.next) this.tail.next.prev = this.tail.prev;
      } else {
        if (this.tail.next) this.tail.next.prev = null;
        this.values[this.hash(this.tail.key, this.max)] = this.tail.next;
      }

      this.tail = this.tail.before;
      this.tail.after = null;
      this.length--;
    }
  }
}

LRUcache.prototype.get = function(key) {
  var index = this.hash(key, this.max);
  var result = this.find(key);

  if (result.found) {
    if (this.head !== result.node) {
      if (this.tail === result.node) {
        this.tail = result.node.before;
        this.tail.after = null;
      } else {
        result.node.before.after = result.node.after;
        result.node.after.before = result.node.before;
      }
      result.node.before = null;
      result.node.after = this.head;
      this.head.before = result.node;
      this.head = result.node;
    }
    return result.node.value;
  }
  return null;
}

LRUcache.prototype.delete = function(key) {
  var index = this.hash(key, this.max);
  var result = this.find(key);

  if (result.found) {
    if (this.head === this.tail ) {
      this.head = this.tail = null;
    } else if (this.head === result.node) {
      this.head = result.node.after;
      this.head.before = null;
    } else if (this.tail === result.node) {
      this.tail = result.node.before;
      this.tail.after = null;
    } else {
      result.node.before.after = result.node.after;
      result.node.after.before = result.node.before;
    }

    if (result.prev) {
      result.prev.next = result.node.next;
      result.node.next.prev = result.prev;
    } else {
      result.node.next.prev = null;
      this.values[(this.hash(result.node.key, this.max))] = result.node.next;
    }
  }
  return null;
}

var lru = new LRUcache(5);
lru.set('a',1)
lru.set('b',2)
lru.set('c',3)
lru.set('d',4)
lru.set('f',5)
lru.delete('a')
