var EWG = require('../data_structures/edgeWeightedGraph.js');

var Heap = function() {
  this.values = [];
};

Heap.prototype.add = function(edge) {
  var data = this.values;
  data.push(edge.value);
  var index = data.length - 1;

  while (data[Math.floor((index - 1) / 2)] && edge.value.weight < data[Math.floor((index - 1) / 2)].weight) {
    var temp = data[index];
    data[index] = data[Math.floor((index - 1) / 2)];
    data[Math.floor((index - 1) / 2)] = temp;
    index = Math.floor((index - 1) / 2);
  }
}

Heap.prototype.rmRoot = function() {
  if (this.values.length === 0) {
    return null;
  }

  var data = this.values;
  var root = data[0];
  data[0] = data[data.length-1];
  data.pop();
  var index = 0;

  while ((data[(index + 1) * 2] && data[index].weight > data[(index + 1) * 2].weight) || (data[((index + 1) * 2) - 1] && data[index].weight > data[((index + 1) * 2) - 1].weight)) {
    if (data[(index + 1) * 2].weight < data[((index + 1) * 2) - 1].weight) {
      var temp = data[index];
      data[index] = data[(index + 1) * 2];
      data[(index + 1) * 2] = temp;
      index = (index + 1) * 2;
    } else {
      var temp = data[index];
      data[index] = data[((index + 1) * 2) - 1];
      data[(index + 1) * 2 - 1] = temp;
      index = (index + 1) * 2 - 1;
    }
  }

  return root;
}

var LazyPrimMST = function(graph) {
  var marked = new Array(graph.vertices.length);
  var mst = [];
  var pq = new Heap();

  var visit = function(graph, vertex) {
    marked[vertex] = true;
    var node = graph.vertices[vertex].first;
    while (node) {
      pq.add(node);
      node = node.next;
    }
  }

  visit(graph, 0);
  while (pq.values.length > 0) {
    var edge = pq.rmRoot();
    var x = edge.either(); var y = edge.other(x);
    if (marked[x] && marked[y]) {continue};

    mst.push(edge);
    if (!marked[x]) visit(graph, x);
    if (!marked[y]) visit(graph, y);
  }

  return {marked: marked, mst: mst, pq: pq};
}

var test = new EWG(8);
test.addEdge(4,5,.35);
test.addEdge(4,7,.37);
test.addEdge(5,7,.28);
test.addEdge(0,7,.16);
test.addEdge(1,5,.32);
test.addEdge(0,4,.38);
test.addEdge(2,3,.17);
test.addEdge(1,7,.19);
test.addEdge(0,2,.26);
test.addEdge(1,2,.36);
test.addEdge(1,3,.29);
test.addEdge(2,7,.34);
test.addEdge(6,2,.40);
test.addEdge(3,6,.52);
test.addEdge(6,0,.58);
test.addEdge(6,4,.93);
console.log(LazyPrimMST(test));
