import { cloneDeep, isEqual } from "lodash-es";

export class Stack {
    maxStack: number;
    list: Array<any>;
    curIndex: number;
    isUndo: boolean;
    undoItem: any;
    redoItem: any;

    constructor(options?: { max?: number }) {
        let { max } = { max: 100, ...options };
        this.maxStack = max;
        this.curIndex = -1;
        this.isUndo = false;
        this.list = [];
    }

    add(before: any, after: any) {
        if (!before || !after) return;
        let data = { before: cloneDeep(before), after: cloneDeep(after) };
        if (isEqual(data, this.list[this.curIndex])) return;
        this.curIndex++;
        this.list.splice(this.curIndex, this.list.length, data);
        if (this.list.length >= this.maxStack) {
            this.list.shift();
            this.curIndex--;
        }
    }

    undo() {
        if (this.curIndex < 0) return;
        if (this.isUndo && this.curIndex > 0) this.curIndex--;
        this.isUndo = true;
        let undoItem = cloneDeep(this.list[this.curIndex].before);
        if (isEqual(undoItem, this.undoItem)) return;
        this.undoItem = undoItem;
        return undoItem;
    }

    redo() {
        if (this.curIndex > this.list.length - 1) return;
        if (!this.isUndo && this.curIndex < this.list.length - 1) this.curIndex++;
        this.isUndo = false;
        let redoItem = cloneDeep(this.list[this.curIndex].after);
        if (isEqual(redoItem, this.redoItem)) return;
        this.redoItem = redoItem;
        return redoItem;
    }
}
