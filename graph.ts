import { AdjacencyList, WeightedGraph } from './model';

export class Vertex {
    constructor(public key: string) {}
}

export class Edge {
    constructor(public from: Vertex, public to: Vertex, public weight: number) {}
}

export class Graph implements WeightedGraph<Vertex> {
    public adjacencyList: AdjacencyList = {};

    addVertex(key: string): void {
        if (!this.adjacencyList[key]) {
            this.adjacencyList[key] = {};
        }
    }

    addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
        const source = vertex1.key;
        const destination = vertex2.key;

        if (!this.adjacencyList[source]) {
            this.addVertex(source);
        }
        if (!this.adjacencyList[destination]) {
            this.addVertex(destination);
        }

        this.adjacencyList[source] = { [destination]: weight, ...this.adjacencyList[source] };
        this.adjacencyList[destination] = { [source]: weight, ...this.adjacencyList[destination] };
    }
}
