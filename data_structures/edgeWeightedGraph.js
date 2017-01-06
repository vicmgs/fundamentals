var Bag = require('./bag.js');

var Edge = function(x, y, weight) {
  this.x = x;
  this.y = y;
  this.weight = weight;
}

Edge.prototype.either = function() {
  return this.x;
}

Edge.prototype.other = function(vertex) {
  return vertex === this.x ? this.y : this.x;
}

var EdgeWeightedGraph = function(num) {
  this.vertices = new Array(num);
  for (var i = 0; i < num; i++) {
    this.vertices[i] = new Bag();
  }
  this.edges = 0;
}

EdgeWeightedGraph.prototype.addEdge = function(x, y, weight) {
  var edge = new Edge(x, y, weight);
  this.vertices[x].add(edge);
  this.vertices[y].add(edge);
  this.edges++;
}

module.exports = EdgeWeightedGraph;
