class ArrayList {
    constructor(capacity) {
        this.array = new Array(capacity);
        this.numItems = 0;
    }

    get(index) {
        if(index >= this.numItems) {
            return null;
        }
        return this.array[index];
    }

    add(E) {
        if(this.array.length <= this.numItems) {
            const tmpArray = new Array(this.array.length * 2);
            for(let i = 0; i < this.array.length; i++) {
                tmpArray[i] = this.array[i];
            }
            this.array = tmpArray;
        }
        this.array[this.numItems] = E;
        this.numItems ++;
    }

    addAll(array) {
        for(let i = 0; i < array.length; i++) {
            this.add(array[i]);
        }
    }

    set(index, E) {
        if(index >= this.numItems) {
            return;
        }
        this.array[index] = E;
    }

    addI(index, E) {
        if(index >= this.numItems) {
            return;
        }
        if(index +1 >= this.array.length) {
            const tmpArray = new Array(this.array.length * 2);
            for(let i = 0; i < this.array.length; i++) {
                tmpArray[i] = this.array[i];
            }
            this.array = tmpArray;
        }
        for(let i = this.numItems; i > 0; i--) {
            this.array[i] = this.array[i-1];
        }
        this.array[index] = E;
        this.numItems++;
    }

    remove(index) {
        let E = this.array[index];
        for(let i = index+1; i < this.numItems; i++) {
            this.array[i-1] = this.array[i]; 
        }
        this.numItems --;
        return E;
    }

    removeObject(E) {
        let index = -1;
        for(let i = 0; i < this.numItems; i++) {
            if(this.array[i] == E) {
                index = i;
                break;
            }
        }
        if(index == -1) {
            return index;
        }
        remove(index);
        return index;
    }

    clear() {
        this.numItems = 0;
    }

    size() {
        return this.numItems;
    }
}

export { ArrayList };