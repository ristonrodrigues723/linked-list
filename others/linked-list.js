class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addAtStart(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.updateVisualization();
    }

    addAtEnd(value) {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.updateVisualization();
    }

    removeFromStart() {
        if (!this.head) return;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.updateVisualization();
    }

    removeFromEnd() {
        if (!this.tail) return;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.updateVisualization();
    }

    updateVisualization() {
        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        let current = this.head;
        while (current) {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            nodeElement.textContent = current.value;
            listContainer.appendChild(nodeElement);
            current = current.next;
        }
    }
}

const list = new DoublyLinkedList();

function addNodeAtStart() {
    const value = document.getElementById('nodeValue').value;
    if (value) {
        list.addAtStart(parseInt(value));
        document.getElementById('nodeValue').value = '';
    }
}

function addNodeAtEnd() {
    const value = document.getElementById('nodeValue').value;
    if (value) {
        list.addAtEnd(parseInt(value));
        document.getElementById('nodeValue').value = '';
    }
}

function removeNodeFromStart() {
    list.removeFromStart();
}

function removeNodeFromEnd() {
    list.removeFromEnd();
}