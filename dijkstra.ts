import { Graph, Vertex } from './graph';
import { Dijkstra, Path, AdjacencyList } from './model';

type Node = string;

interface Distances {
    [node: Node]: number;
}

export class FSP implements Dijkstra<Vertex> {
    private graph: AdjacencyList;

    constructor(g: Graph) {
        this.graph = g.adjacencyList;
    }

    public findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
        const start = vertex1.key;
        const end = vertex2.key;

        if (start === end) {
            return {
                distance: 0,
                path: [end],
            };
        }

        const distances: Distances = Object.assign({ [end]: Infinity }, this.graph[start]);

        const parents: { [node: Node]: Node | null } = { [end]: null };
        for (const child in this.graph[start]) {
            parents[child] = start;
        }

        const visited: Node[] = [];

        let node = this.shortestDistanceNode(distances, visited);

        while (node) {
            const distance = distances[node];
            const children = this.graph[node];

            for (const child in children) {
                if (child === start) {
                    continue;
                } else {
                    const newDistance = distance + children[child];

                    if (!distances[child] || distances[child] > newDistance) {
                        distances[child] = newDistance;
                        parents[child] = node;
                    }
                }
            }
            visited.push(node);

            node = this.shortestDistanceNode(distances, visited);
        }

        let parent = parents[end];
        const shortestPath = parent ? [end] : [];
        while (parent) {
            shortestPath.push(parent);
            parent = parents[parent];
        }
        shortestPath.reverse();

        return {
            distance: distances[end],
            path: shortestPath,
        };
    }

    private shortestDistanceNode(distances: Distances, visited: string[]) {
        let shortest = null;

        for (const node in distances) {
            const currentIsShortest = shortest === null || distances[node] < distances[shortest];
            if (currentIsShortest && !visited.includes(node)) {
                shortest = node;
            }
        }
        return shortest;
    }

    public findAllShortestPaths(vertex: Vertex): Record<string, Path> {
        const start = vertex.key;

        const solutions: Record<string, Path> = {};
        solutions[start] = { distance: 0, path: [start] };

        while (true) {
            let parent = null;
            let nearest = null;
            let distance = Infinity;

            for (const node in solutions) {
                if (!solutions[node]) continue;
                const nodeDistance = solutions[node].distance;
                const adjacentNodes = this.graph[node];

                for (const adjacentNode in adjacentNodes) {
                    if (solutions[adjacentNode]) continue;

                    const adjacentNodeDistance = adjacentNodes[adjacentNode] + nodeDistance;
                    if (adjacentNodeDistance < distance) {
                        parent = solutions[node];
                        nearest = adjacentNode;
                        distance = adjacentNodeDistance;
                    }
                }
            }

            if (distance === Infinity) {
                break;
            }

            if (nearest && parent) {
                if (!solutions[nearest]) solutions[nearest] = { distance: 0, path: [] };
                solutions[nearest].path = parent.path.concat(nearest);
                solutions[nearest].distance = distance;
            }
        }

        return solutions;
    }
}
