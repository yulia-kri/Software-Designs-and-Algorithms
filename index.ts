class MaxPriorityQueue<T> {
    private heap: T[] = [];
    private comparator: (a: number, b: number) => number;

    constructor(compareFn = (a: any, b: any) => a - b) {
        this.comparator = (indexOne, indexTwo) => compareFn(this.heap[indexOne], this.heap[indexTwo]);
    }

    public get allElements(): T[] {
        return this.heap;
    }

    public enqueue(value: T) {
        this.heap.push(value);
        this.bubbleUp();
    }

    public dequeue(): T | null | undefined {
        if (this.heap.length === 0) return null;
        const root = this.heap.shift();

        this.heap.unshift(this.heap[this.size]);
        this.heap.pop();

        this.bubbleDown();

        return root;
    }

    private get size(): number {
        return this.heap.length - 1;
    }

    private parent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private left(index: number): number {
        return 2 * index + 1;
    }

    private right(index: number): number {
        return 2 * index + 2;
    }

    private swap(indexOne: number, indexTwo: number) {
        const temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    private bubbleUp() {
        let index = this.heap.length - 1;

        while (index !== 0 && this.comparator(index, this.parent(index)) > 0) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    private bubbleDown(index = 0) {
        let smallest = index;
        const left = this.left(index);
        const right = this.right(index);

        if (left < this.heap.length && this.comparator(smallest, left) < 0) {
            smallest = left;
        }

        if (right < this.heap.length && this.comparator(smallest, right) < 0) {
            smallest = right;
        }

        if (smallest !== index) {
            this.swap(smallest, index);
            this.bubbleDown(smallest);
        }
    }
}

class Job {
    public priority: number;

    constructor(maxPriority = 1000) {
        this.priority = this.getRandomInt(maxPriority);
    }

    public run() {
        console.log(`Job's priority is ${this.priority}`);
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}

const priorityQueue = new MaxPriorityQueue<Job>((a, b) => a.priority - b.priority);
const NUM_OF_TASKS = 1000;

for (let i = 0; i < NUM_OF_TASKS; i++) {
    priorityQueue.enqueue(new Job());
}

console.log(priorityQueue.allElements);
priorityQueue.dequeue()?.run();
priorityQueue.dequeue()?.run();
priorityQueue.dequeue()?.run();
priorityQueue.dequeue()?.run();
