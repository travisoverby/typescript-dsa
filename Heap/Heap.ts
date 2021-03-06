import { HeapComparator, HeapType } from './types';
import { HEAP_MIN_COMP, HEAP_MAX_COMP } from './utils';

export default class Heap {
    private heap: Array<string | number> = [];
    private type: HeapType;
    private comparator: HeapComparator;
    private length: number = 0;

    constructor(array: Array<string | number> = [], type: HeapType = 'min', comparator?: HeapComparator) {
        this.type = type;
        this.comparator = type === 'min' ? HEAP_MIN_COMP : HEAP_MAX_COMP;
        if (comparator) this.comparator = comparator;
        this.buildHeap(array);
    }

    buildHeap(array: Array<string | number>) {
        for (const val of array) {
            this.insert(val);
        }
    }

    siftDown(idx: number) {
        if (this.heap.length < 2) return;
        let currIdx = idx;

        let firstChildIdx = this.getFirstChildIdx(currIdx);
        let secondChildIdx = this.getSecondChildIdx(currIdx);
        let minMaxChildIdx = this.getMinMaxChildIdx(firstChildIdx, secondChildIdx);

        while (minMaxChildIdx !== -1 && this.comparator(this.heap[minMaxChildIdx], this.heap[currIdx])) {
            this.swap(currIdx, minMaxChildIdx);

            currIdx = minMaxChildIdx;
            firstChildIdx = this.getFirstChildIdx(currIdx);
            secondChildIdx = this.getSecondChildIdx(currIdx);
            minMaxChildIdx = this.getMinMaxChildIdx(firstChildIdx, secondChildIdx);
        }
    }

    siftUp(idx: number) {
        if (this.heap.length < 2) return;

        let currIdx = idx;
        let parentIdx = this.getParentIdx(idx);

        while (parentIdx !== -1 && this.comparator(this.heap[currIdx], this.heap[parentIdx])) {
            this.swap(parentIdx, currIdx);

            currIdx = parentIdx;
            parentIdx = this.getParentIdx(currIdx);
        }

        return;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return this.length === 0;
    }

    remove() {
        this.swap(0, this.heap.length - 1);
        const removed = this.heap.pop();
		this.length -= 1;
        this.siftDown(0);
        return removed;
    }

    insert(value: string | number) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
        this.length += 1;
    }

    getParentIdx(idx: number): number {
        const index = Math.floor((idx - 1) / 2);
        return index >= 0 ? index : -1;
    }

    getFirstChildIdx(idx: number): number {
        return 2 * idx + 1;
    }

    getSecondChildIdx(idx: number): number {
        return 2 * idx + 2;
    }

    getMinMaxChildIdx(firstChildIdx: number, secondChildIdx: number) {
        const firstChild = this.heap[firstChildIdx];
        const secondChild = this.heap[secondChildIdx];

        if (!firstChild && firstChild !== 0) return -1;
        if (!secondChild && secondChild !== 0) return firstChildIdx;
        if (this.type === 'min') {
            return firstChild < secondChild ? firstChildIdx : secondChildIdx;
        } else {
            return firstChild > secondChild ? firstChildIdx : secondChildIdx;
        }
    }

    swap(idx: number, swapIdx: number): void {
        const temp = this.heap[swapIdx];
        this.heap[swapIdx] = this.heap[idx];
        this.heap[idx] = temp;
    }
}
