const circularList = document.getElementById('circularList');
const valueInput = document.getElementById('valueInput');
const messageBox = document.getElementById('messageBox');
let nodes = [];

function showMessage(message) {
    messageBox.textContent = message;
}

function createNode(value) {
    const node = document.createElement('div');
    node.className = 'node';
    node.textContent = value;
    return node;
}

function updateNodePositions() {
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    nodes.forEach((node, index) => {
        const angle = (index / nodes.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
    });
}

function addNode() {
    const value = valueInput.value || nodes.length + 1;
    if (nodes.length < 8) {
        const node = createNode(value);
        circularList.appendChild(node);
        nodes.push(node);
        updateNodePositions();
        valueInput.value = '';
        showMessage(`Node with value ${value} added.`);
    } else {
        showMessage("Maximum number of nodes reached (8).");
    }
}

function removeNode() {
    if (nodes.length > 0) {
        const removedNode = nodes.pop();
        circularList.removeChild(removedNode);
        updateNodePositions();
        showMessage("Last node removed.");
    } else {
        showMessage("The list is empty.");
    }
}

// Initialize with 3 nodes
for (let i = 0; i < 3; i++) {
    addNode();
}