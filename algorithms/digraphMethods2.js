var Digraph = require('../data_structures/digraph.js');
var depthFirstOrder = require('./digraphMethods.js');
var Queue = require('../data_structures/queue.js');
var Stack = require('../data_structures/stack.js');

var reverseGraph = function(graph) {
  var reverse = new Digraph(graph.vertices.length);

  for (var i = 0; i < reverse.vertices.length; i++) {
    var node = graph.vertices[i].first;
    while (node) {
      reverse.addEdge(node.value, i);
      node = node.next;
    }
  }
  return reverse;
}

var strongComponents = function(graph) {
  var revG = reverseGraph(graph);
  var revPost = depthFirstOrder(revG).reversePost.first;
  var marked = new Array(graph.vertices.length);
  var count = 0;
  var id = [];

  var dfs = function(vertex) {
    marked[vertex] = true;
    id[vertex] = count;

    graph.adj(vertex).forEach(function(connect) {
      if (marked[connect] !== true) {
        dfs(connect);
      }
    });
  }

  while (revPost) {
    if (!marked[revPost.value]) {
      dfs(revPost.value);
      count++;
    }
    revPost = revPost.next;
  }

  return count;
}

var reachableMatrix = function(graph) {
  var matrix = new Array(graph.vertices.length);
  for (var j = 0; j < matrix.length; j++) {
    matrix[j] = [];
  }
  var marked = new Array(graph.vertices.length);

  var dfs = function(i, vertex) {
    marked[vertex] = true;
    matrix[i].push(vertex);

    graph.adj(vertex).forEach(function(connect) {
      if (marked[connect] !== true) {
        dfs(i, connect);
      }
    });
  }

  for (var i = 0; i < graph.vertices.length; i++) {
    dfs(i, i);
    marked = new Array(graph.vertices.length);
  }

  return matrix;
}

var test = new Digraph(13);
test.addEdge(0,1);
test.addEdge(0,5);
test.addEdge(2,3);
test.addEdge(2,0);
test.addEdge(3,2);
test.addEdge(3,5);
test.addEdge(4,2);
test.addEdge(4,3);
test.addEdge(5,4);
test.addEdge(6,0);
test.addEdge(6,4);
test.addEdge(6,8);
test.addEdge(6,9);
test.addEdge(7,6);
test.addEdge(7,9);
test.addEdge(8,6);
test.addEdge(9,10);
test.addEdge(9,11);
test.addEdge(10,12);
test.addEdge(11,12);
test.addEdge(11,4);
test.addEdge(12,9);
console.log(strongComponents(test));
console.log(reachableMatrix(test));
