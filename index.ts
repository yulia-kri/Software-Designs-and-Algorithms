import { FSP } from './dijkstra';
import { Edge, Graph, Vertex } from './graph';
import { WeightedGraph, AdjacencyList, Dijkstra } from './model';

const vertex1 = new Vertex('1');
const vertex2 = new Vertex('2');
const vertex3 = new Vertex('3');
const vertex4 = new Vertex('4');
const vertex5 = new Vertex('5');
const vertices = [vertex1, vertex2, vertex3, vertex4, vertex5];
const edges = [
    new Edge(vertex1, vertex4, 3),
    new Edge(vertex1, vertex2, 5),
    new Edge(vertex1, vertex3, 4),
    new Edge(vertex2, vertex4, 6),
    new Edge(vertex2, vertex3, 5),
];

const graph: WeightedGraph<Vertex> & { adjacencyList: AdjacencyList } = new Graph();

vertices.forEach(vertex => graph.addVertex(vertex.key));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

const dijkstra: Dijkstra<Vertex> = new FSP(graph);

console.log(dijkstra.findShortestPath(vertex4, vertex3)); // { path: ['4', '1', '3'], distance: 7 }
console.log(dijkstra.findShortestPath(vertex1, vertex5)); // { path: [], distance: Infinity }
console.log(dijkstra.findShortestPath(vertex1, vertex1)); // { path: ['1'], distance: 0 }

console.log(dijkstra.findAllShortestPaths(vertex4));
