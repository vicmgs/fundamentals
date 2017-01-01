var Graph = require('../data_structures/graph.js');

var connectedComp = function(graph) {
  var marked = new Array(graph.vertices.length);
  var ids = new Array(graph.vertices.length);
  var count = 0;

  var dfs = function(vertex) {
    marked[vertex] = true;
    ids[vertex] = count;
    graph.adj(vertex).forEach(function(connect) {
      if (!marked[connect]) {
        dfs(connect);
      }
    });
  }

  for (var i = 0; i < graph.vertices.length; i++) {
    if (!marked[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
}

var hasCycle = function(graph) {
  var marked = new Array(graph.vertices.length);
  var cycle = false;

  var dfs = function(vertex, prev) {
    marked[vertex] = true;
    graph.adj(vertex).forEach(function(connect) {
      if (!marked[connect]) {
        dfs(connect, vertex);
      } else if (connect !== prev) {
        cycle = true;
      }
    });
  }

  for (var i = 0; i < graph.vertices.length; i++) {
    if (!marked[i]) {
      dfs(i, i);
    }
  }

  return cycle;
}

var isBipartite = function(graph) {
  var marked = new Array(graph.vertices.length);
  var color = new Array(graph.vertices.length);
  var isBipartite = true;

  var dfs = function(vertex) {
    marked[vertex] = true;
    graph.adj(vertex).forEach(function(connect) {
      if (!marked[connect]) {
        color[connect] = !color[vertex];
        dfs(connect);
      } else if (color[connect] === color[vertex]) {
        isBipartite = false;
      }
    });
  }

  for (var i = 0; i < graph.vertices.length; i++) {
    if (color[i] === undefined) {
      color[i] = true;
    }
    if (!marked[i]) {
      dfs(i);
    }
  }
  console.log(color);
  return isBipartite;
}

var test = new Graph(13);
test.addEdge(3,0);
test.addEdge(0,5);
test.addEdge(0,1);
test.addEdge(0,2);
test.addEdge(3,4);
test.addEdge(4,6);
test.addEdge(4,5);
test.addEdge(3,5);
test.addEdge(0,6);
test.addEdge(7,8);
test.addEdge(9,12);
test.addEdge(11,12);
test.addEdge(9,10);
test.addEdge(9,11);
console.log(connectedComp(test));
console.log(hasCycle(test));
console.log(isBipartite(test));
