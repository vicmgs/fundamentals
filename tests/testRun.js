var expect = require('chai').expect;
var Heap = require('../data_structures/heap.js');

describe("Heap", function() {
  var heap;
  before(function() {
    heap = new Heap();
  });
  it("returns a new heap with 0 length", function() {
    expect(heap.values.length).to.equal(0);
  });
  it("adds to new heap", function() {
    heap.add(0);
    expect(heap.values.length).to.equal(1);
    expect(heap.values).to.deep.equal([0]);
  });
  it("remove root from heap", function() {
    heap.rmRoot();
    expect(heap.values.length).to.equal(0);
    expect(heap.values).to.deep.equal([]);
  });
  it("adds multiple values to heap in decreasing order", function() {
    heap.add(10);
    heap.add(8);
    heap.add(5);
    heap.add(2);
    heap.add(0);
    expect(heap.values.length).to.equal(5);
    expect(heap.values).to.deep.equal([10,8,5,2,0]);
  });
  it("adds multiple values to heap in any order", function() {
    heap = new Heap();
    heap.add(0);
    heap.add(8);
    heap.add(10);
    heap.add(2);
    heap.add(5);
    heap.add(2);
    expect(heap.values.length).to.equal(6);
  });
  it("adds multiple values to heap and values should swim", function() {
    expect(heap.values).to.deep.equal([10,5,8,0,2,2]);
  });
  it("removing root should cause replacement to sink", function() {
    heap.rmRoot();
    expect(heap.values).to.deep.equal([8,5,2,0,2]);
  });
  after(function() {
    heap = null;
  });
});
