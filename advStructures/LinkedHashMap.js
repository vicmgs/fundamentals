var Node = function(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.after = null;
  this.before = null;
}

var LinkedHashMap = function(max) {
  this.values = new Array(max);
  for (var i = 0; i < this.values.length; i++) {
    this.values[i] = null;
  }
  this.max = max;
  this.head = null;
  this.tail = null;
}

LinkedHashMap.prototype.hash = function(str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

LinkedHashMap.prototype.set = function(key, value) {
  var index = this.hash(key, this.max);
  var node = this.values[index];
  var newNode = new Node(key,value);

  if (node) {
    while (node.next) {
      if (node.key === key) {
        node.value = value;
        return;
      }
      node = node.next;
    }
    if (node.key === key) {
      node.value = value;
      return;
    }
    node.next = newNode
  } else {
    this.values[index] = newNode;
  }

  if (this.tail) {
    newNode.before = this.tail;
    this.tail.after = newNode;
    this.tail = newNode;
  } else {
    this.head = newNode;
    this.tail = newNode;
  }
}

LinkedHashMap.prototype.get = function(key) {
  var index = this.hash(key, this.max);
  var node = this.values[index];

  while (node) {
    if (node.key === key) {
      return node.value;
    }
    node = node.next;
  }
  return null;
}

LinkedHashMap.prototype.delete = function(key) {
  var index = this.hash(key, this.max);
  var node = this.values[index];
  var prevNode = null;

  while (node) {
    if (node.key === key) {
      if (prevNode) {
        prevNode.next = node.next;
      } else {
        this.values[index] = node.next;
      }

      if (node === this.head && node === this.tail) {
        this.head = this.tail = null;
      } else if (node === this.head) {
        this.head = this.head.next;
        this.head.before = null;
      } else if (node === this.tail) {
        this.tail = this.tail.before;
        this.tail.after = null;
      } else {
        node.after.before = node.before;
        node.before.after = node.after;
      }
      return;
    }
    prevNode = node;
    node = node.next;
  }
}

var linkedHM = new LinkedHashMap(3);
linkedHM.set('hello', 0);
linkedHM.set('goodby', 1);
linkedHM.set('goodbye', 2);
linkedHM.set('yolo', 3);
linkedHM.set('yola', 4);
linkedHM.set('yolo', 400);
linkedHM.delete('yola');
console.log(linkedHM.values);
