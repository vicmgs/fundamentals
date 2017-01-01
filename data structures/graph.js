var Bag = require('./bag.js');
var Queue = require('./queue.js');

var Graph = function(vertices) {
  this.vertices = [];
  this.edges = 0;
  for (var i = 0; i < vertices; i++) {
    this.vertices.push(new Bag());
  }
}

Graph.prototype.addEdge = function(v, w) {
  this.vertices[v].add(w);
  this.vertices[w].add(v);
  this.edges++;
}

Graph.prototype.breadthFirstSearch = function(vertex) {
  var marked = new Array(this.vertices.length);
  var queue = new Queue();
  marked[vertex] = true;
  queue.enqueue(vertex);

  while(!queue.isEmpty()) {
    vertex = queue.dequeue();
    this.adj(vertex).forEach(function(vertex) {
      if (!marked[vertex]) {
        marked[vertex] = true;
        queue.enqueue(vertex)
      }
    });
  }
  return marked;
}

Graph.prototype.breadthFirstPaths = function(vertex) {
  var marked = new Array(this.vertices.length);
  var queue = new Queue();
  var pathTo = new Array(this.vertices.length);
  pathTo[vertex] = vertex;
  marked[vertex] = true;
  queue.enqueue(vertex);

  while(!queue.isEmpty()) {
    vertex = queue.dequeue();
    this.adj(vertex).forEach(function(connect) {
      if (!marked[connect]) {
        marked[connect] = true;
        pathTo[connect] = vertex;
        queue.enqueue(connect)
      }
    });
  }
  return pathTo;
}

Graph.prototype.depthFirstSearch = function(vertex) {
  var marked = new Array(this.vertices.length);
  var graph = this;
  var dfs = function(vertex) {
    marked[vertex] = true;
    graph.adj(vertex).forEach(function(vertex) {
      if (!marked[vertex]) {
        dfs(vertex);
      }
    })
  }
  dfs(vertex);
  return marked;
}

Graph.prototype.depthFirstPaths = function(vertex) {
  var marked = new Array(this.vertices.length);
  var pathTo = new Array(this.vertices.length);
  pathTo[vertex] = vertex;
  var graph = this;
  var dfp = function(vertex) {
    marked[vertex] = true;
    graph.adj(vertex).forEach(function(connect) {
      if (!marked[connect]) {
        pathTo[connect] = vertex;
        dfp(connect);
      }
    })
  }
  dfp(vertex);

  return pathTo;
}

Graph.prototype.pathTo = function(vertex, method) {
  var pathTo;
  if (method === 'breadth' || method === 'b') {
    pathTo = this.breadthFirstPaths(0);
  } else {
    pathTo = this.depthFirstPaths(0);
  }

  var paths = [];
  var path = ''+vertex;
  for (var i = 0; i < this.vertices.length; i++) {
    paths.push(null);
  }
  paths[vertex] = path.split('');

  while (pathTo[vertex] !== vertex) {
    vertex = pathTo[vertex];
    path = vertex + path;
    paths[vertex] = path.split('');
  }

  return paths;
}

Graph.prototype.toString = function() {
  for (var i = 0; i < this.vertices.length; i++) {
    var edges = [];
    for (var node = this.vertices[i].first; node; node = node.next) {
      edges.push(node.value);
    }
    console.log('Vertex ' + i + ': ' + edges.join(' '));
  }
}

Graph.prototype.adj = function(vertex) {
  var connects = [];
  for(var node = this.vertices[vertex].first; node; node = node.next) {
    connects.push(node.value);
  }
  return connects;
}

test = new Graph(6);
test.addEdge(2,4);
test.addEdge(2,3);
test.addEdge(1,2);
test.addEdge(0,5);
test.addEdge(0,1);
test.addEdge(0,2);
test.addEdge(3,4);
test.addEdge(3,5);
console.log(test.pathTo(5,'d'));
console.log(test.pathTo(5,'b'));
