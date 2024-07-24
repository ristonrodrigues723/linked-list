class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
    }

    addAtStart(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.next = this.head;
            newNode.prev = this.head.prev;
            this.head.prev.next = newNode;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.updateVisualization();
    }

    addAtEnd(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else {
            newNode.next = this.head;
            newNode.prev = this.head.prev;
            this.head.prev.next = newNode;
            this.head.prev = newNode;
        }
        this.updateVisualization();
    }

    removeFromStart() {
        if (!this.head) return;
        if (this.head.next === this.head) {
            this.head = null;
        } else {
            this.head.prev.next = this.head.next;
            this.head.next.prev = this.head.prev;
            this.head = this.head.next;
        }
        this.updateVisualization();
    }

    removeFromEnd() {
        if (!this.head) return;
        if (this.head.next === this.head) {
            this.head = null;
        } else {
            this.head.prev.prev.next = this.head;
            this.head.prev = this.head.prev.prev;
        }
        this.updateVisualization();
    }

    updateVisualization() {
        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        if (!this.head) return;

        let current = this.head;
        do {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node';
            nodeElement.textContent = current.value;
            listContainer.appendChild(nodeElement);
            current = current.next;
        } while (current !== this.head);
    }
}

const list = new CircularDoublyLinkedList();

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