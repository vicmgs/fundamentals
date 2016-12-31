var Bag = require('./bag.js');

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

Graph.prototype.toString = function() {
  for (var i = 0; i < this.vertices.length; i++) {
    var edges = [];
    for (var node = this.vertices[i].first; node; node = node.next) {
      edges.push(node.value);
    }
    console.log('Vertex ' + i + ': ' + edges.join(' '));
  }
}

// var adjacent = function(vertex) {
//   for(var node = vertex.first; node; node = node.next) {
//
//   }
// }

test = new Graph(10);
test.addEdge(1,3);
test.addEdge(1,5);
// test.toString();
