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
        showMessage(`Added ${value} at the start`, 'success');
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
        showMessage(`Added ${value} at the end`, 'success');
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
        showMessage('Removed node from the start', 'success');
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
        showMessage('Removed node from the end', 'success');
    }

    search(value) {
        if (!this.head) return null;
        let current = this.head;
        do {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        } while (current !== this.head);
        return null;
    }

    insertAtPosition(value, position) {
        if (position <= 0) {
            this.addAtStart(value);
            return;
        }

        const newNode = new Node(value);
        let current = this.head;
        let count = 0;

        do {
            if (count === position - 1) {
                newNode.next = current.next;
                newNode.prev = current;
                current.next.prev = newNode;
                current.next = newNode;
                this.updateVisualization();
                showMessage(`Inserted ${value} at position ${position}`, 'success');
                return;
            }
            current = current.next;
            count++;
        } while (current !== this.head);

        this.addAtEnd(value);
    }

    deleteByValue(value) {
        if (!this.head) return;

        let current = this.head;
        do {
            if (current.value === value) {
                if (current === this.head) {
                    this.removeFromStart();
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    this.updateVisualization();
                    showMessage(`Deleted node with value ${value}`, 'success');
                }
                return;
            }
            current = current.next;
        } while (current !== this.head);

        showMessage(`Node with value ${value} not found`, 'error');
    }

    clear() {
        this.head = null;
        this.updateVisualization();
        showMessage('Cleared all nodes', 'success');
    }

    updateVisualization() {
        const listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = '';
        if (!this.head) return;

        let current = this.head;
        let angle = 0;
        let radius = 150;
        do {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node add-animation';
            nodeElement.textContent = current.value;
            const x = Math.cos(angle) * radius + 200;
            const y = Math.sin(angle) * radius + 200;
            nodeElement.style.left = `${x}px`;
            nodeElement.style.top = `${y}px`;
            listContainer.appendChild(nodeElement);

            angle += (2 * Math.PI) / this.size();
            current = current.next;
        } while (current !== this.head);
    }

    



function highlightNode(node) {
    const nodes = document.querySelectorAll('.node');
    nodes.forEach((nodeElement, index) => {
        if (parseInt(nodeElement.textContent) === node.value) {
            nodeElement.classList.add('highlight');
            setTimeout(() => {
                nodeElement.classList.remove('highlight');
            }, 2000);
        }
    });
}