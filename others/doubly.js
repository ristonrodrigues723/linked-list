const listContainer = document.getElementById('listContainer');
const valueInput = document.getElementById('valueInput');
const positionInput = document.getElementById('positionInput');

class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
        this.element = this.createNodeElement();
    }

    createNodeElement() {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = 'node node-appear';
        nodeDiv.innerHTML = `
            <div class="node-prev">Prev</div>
            <div class="node-data">${this.value}</div>
            <div class="node-next">Next</div>
            <div class="prev-arrow arrow"></div>
            <div class="next-arrow arrow"></div>
        `;
        return nodeDiv;
    }
}

class DoublyCircularLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            const last = this.head.prev;
            last.next = newNode;
            newNode.prev = last;
            newNode.next = this.head;
            this.head.prev = newNode;
        }

        this.size++;
        this.updateUI();
    }

    insert(value, position) {
        if (position < 0 || position > this.size) return;

        const newNode = new Node(value);

        if (position === 0) {
            if (!this.head) {
                this.head = newNode;
                newNode.next = newNode;
                newNode.prev = newNode;
            } else {
                const last = this.head.prev;
                newNode.next = this.head;
                newNode.prev = last;
                this.head.prev = newNode;
                last.next = newNode;
                this.head = newNode;
            }
        } else {
            let current = this.head;
            for (let i = 0; i < position - 1; i++) {
                current = current.next;
            }
            newNode.next = current.next;
            newNode.prev = current;
            current.next.prev = newNode;
            current.next = newNode;
        }

        this.size++;
        this.updateUI();
    }

    removeLast() {
        if (!this.head) return;

        if (this.size === 1) {
            this.head = null;
        } else {
            const last = this.head.prev;
            last.prev.next = this.head;
            this.head.prev = last.prev;
        }

        this.size--;
        this.updateUI();
    }

    clear() {
        this.head = null;
        this.size = 0;
        this.updateUI();
    }

    updateUI() {
        listContainer.innerHTML = '';
        if (!this.head) return;

        let current = this.head;
        do {
            listContainer.appendChild(current.element);
            current = current.next;
        } while (current !== this.head);
    }
}

const list = new DoublyCircularLinkedList();

function addNode() {
    const value = valueInput.value || Math.floor(Math.random() * 100);
    list.add(value);
    valueInput.value = '';
}

function insertNode() {
    const value = valueInput.value || Math.floor(Math.random() * 100);
    const position = parseInt(positionInput.value) || 0;
    list.insert(value, position);
    valueInput.value = '';
    positionInput.value = '';
}

function removeNode() {
    list.removeLast();
}

function clearList() {
    list.clear();
}

// Initialize with some nodes
for (let i = 0; i < 5; i++) {
    list.add(Math.floor(Math.random() * 100));
}