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

    addNode(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.updateDisplay();
    }

    deleteNode(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                if (current.prev) current.prev.next = current.next;
                if (current.next) current.next.prev = current.prev;
                if (current === this.head) this.head = current.next;
                if (current === this.tail) this.tail = current.prev;
                this.updateDisplay();
                return true;
            }
            current = current.next;
        }
        return false;
    }

    reverse() {
        let temp = null;
        let current = this.head;

        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        temp = this.head;
        this.head = this.tail;
        this.tail = temp;

        this.updateDisplay();
    }

    generateRandomNode() {
        const randomValue = Math.floor(Math.random() * 100);
        this.addNode(randomValue);
    }

    updateDisplay() {
        const listContainer = document.getElementById('linkedList');
        listContainer.innerHTML = '';
        let current = this.head;
        while (current) {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'node-wrapper';
            nodeElement.innerHTML = `
                <div class="node">
                    <div class="node-content">
                        <div class="node-prev">${current.prev ? current.prev.value : 'null'}</div>
                        <div class="node-value">${current.value}</div>
                        <div class="node-next">${current.next ? current.next.value : 'null'}</div>
                    </div>
                </div>
            `;
            listContainer.appendChild(nodeElement);
            if (current.next) {
                const arrowElement = document.createElement('div');
                arrowElement.className = 'arrow';
                arrowElement.textContent = '↔';
                listContainer.appendChild(arrowElement);
            }
            current = current.next;
        }
    }
}

const list = new DoublyLinkedList();

document.getElementById('addNode').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        list.addNode(value);
        displayMessage('Node added successfully', 'success');
    } else {
        displayMessage('Please enter a valid number', 'error');
    }
});

document.getElementById('deleteNode').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        const deleted = list.deleteNode(value);
        if (deleted) {
            displayMessage('Node deleted successfully', 'success');
        } else {
            displayMessage('Node not found', 'error');
        }
    } else {
        displayMessage('Please enter a valid number', 'error');
    }
});

document.getElementById('reverseList').addEventListener('click', () => {
    list.reverse();
    displayMessage('List reversed successfully', 'success');
});

document.getElementById('generateRandom').addEventListener('click', () => {
    list.generateRandomNode();
    displayMessage('Random node added successfully', 'success');
});

function displayMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    messageBox.appendChild(messageElement);
    setTimeout(() => messageBox.removeChild(messageElement), 3000);
}