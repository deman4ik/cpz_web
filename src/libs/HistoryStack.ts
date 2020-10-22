export class HistoryStack {
    max_size: number;

    size: number;

    data: Map<number, string>;

    constructor(max_size: number) {
        this.max_size = max_size;
        this.size = 0;
        this.data = new Map();
    }

    get history() {
        return this.data;
    }

    push(url) {
        const newSize = this.size + 1;
        if (newSize <= this.max_size) {
            this.data.set(newSize, url);
            this.size = newSize;
        } else {
            const newHistory = new Map();
            this.data.forEach((value, key) => {
                if (+key > 1) {
                    newHistory.set(+key - 1, value);
                }
            });
            newHistory.set(this.size, url);
            this.data = newHistory;
        }
    }

    get last() {
        return this.data.get(this.size);
    }
}
