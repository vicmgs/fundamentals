var Digraph = require('../data_structures/digraph.js');

var isDAG = function(graph) {
  var marked = new Array(graph.vertices.length);
  var edgeTo = new Array(graph.vertices.length);
  var onStack = new Array(graph.vertices.length);
  var cycle = '';

  var dfs = function(vertex) {
    marked[vertex] = true;
    onStack[vertex] = true;

    graph.adj(vertex).forEach(function(connect) {
      if (marked[connect] !== true) {
        edgeTo[connect] = vertex;
        dfs(connect);
      } else if (onStack[connect]) {
        for (var x = vertex; x !== connect; x = edgeTo[x]) {
          cycle = x + cycle;
        }
        cycle = connect + cycle;
        cycle = vertex + cycle;
        cycle = '|' + cycle;
      }
    });
    onStack[vertex] = false;
  }

  for (var i = 0; i < graph.vertices.length; i++) {
    if (marked[i] !== true) {
      dfs(i);
    }
  }

  return {hasCycle: cycle.length > 0, cycles: cycle.split('|') || null};
}

var test = new Digraph(6);
test.addEdge(0,5);
test.addEdge(5,1);
test.addEdge(1,0);
test.addEdge(5,4);
test.addEdge(4,3);
test.addEdge(3,5);
test.toString();
console.log(isDAG(test).hasCycle);
console.log(isDAG(test).cycles);
