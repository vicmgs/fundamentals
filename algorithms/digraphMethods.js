var Digraph = require('../data_structures/digraph.js');
var Queue = require('../data_structures/queue.js');
var Stack = require('../data_structures/stack.js');

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

var depthFirstOrder = function(graph) {
  var pre = new Queue();
  var post = new Queue();
  var reversePost = new Stack();
  var marked = new Array(graph.vertices.length);

  var dfs = function(vertex) {
    marked[vertex] = true;
    pre.enqueue(vertex);

    graph.adj(vertex).forEach(function(connect) {
      if (marked[connect] !== true) {
        dfs(connect);
      }
    });
    post.enqueue(vertex);
    reversePost.push(vertex);
  }

  for (var i = 0; i < graph.vertices.length; i++) {
    if (marked[i] !== true) {
      dfs(i);
    }
  }
  return {preOrder: pre, postOrder: post, reversePost: reversePost};
}

var test = new Digraph(13);
// test.addEdge(0,5);
// test.addEdge(5,1);
// test.addEdge(1,0);
// test.addEdge(5,4);
// test.addEdge(4,3);
// test.addEdge(3,5);
// console.log(isDAG(test).hasCycle);
// console.log(isDAG(test).cycles);
test.addEdge(0,1);
test.addEdge(0,5);
test.addEdge(0,6);
test.addEdge(2,3);
test.addEdge(2,0);
test.addEdge(3,5);
test.addEdge(5,4);
test.addEdge(6,4);
test.addEdge(6,9);
test.addEdge(7,6);
test.addEdge(8,7);
test.addEdge(9,10);
test.addEdge(9,11);
test.addEdge(9,12);
test.addEdge(11,12);
// console.log(depthFirstOrder(test));

module.exports = depthFirstOrder;
