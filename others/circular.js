const listContainer = document.getElementById('listContainer');
const valueInput = document.getElementById('valueInput');
const messageBox = document.getElementById('messageBox');
let nodes = [];

function showMessage(message) {
    messageBox.textContent = message;
}

function createNode(value) {
    const nodeContainer = document.createElement('div');
    nodeContainer.className = 'node-container';

    const node = document.createElement('div');
    node.className = 'node';
    node.textContent = value;

    const arrow = document.createElement('div');
    arrow.className = 'arrow';

    nodeContainer.appendChild(node);
    nodeContainer.appendChild(arrow);

    return nodeContainer;
}



function updateNodePositions() {
    const lastNodeArrow = document.querySelector('.last-node-arrow');
    if (lastNodeArrow) {
        lastNodeArrow.remove();
    }

    if (nodes.length > 1) {
        const lastNodeArrow = document.createElement('div');
        lastNodeArrow.className = 'last-node-arrow';
        listContainer.appendChild(lastNodeArrow);

        const firstNodeRect = nodes[0].getBoundingClientRect();
        const lastNodeRect = nodes[nodes.length - 1].getBoundingClientRect();
        const containerRect = listContainer.getBoundingClientRect();

        lastNodeArrow.style.width = `${lastNodeRect.right - firstNodeRect.left}px`;
        lastNodeArrow.style.left = `${firstNodeRect.left - containerRect.left}px`;
    }
}



function addNode() {
    const value = valueInput.value || nodes.length + 1;
    const node = createNode(value);
    listContainer.appendChild(node);
    nodes.push(node);
    updateNodePositions();
    valueInput.value = '';
    showMessage(`Node with value ${value} added.`);
}

function removeNode() {
    if (nodes.length > 0) {
        const removedNode = nodes.pop();
        listContainer.removeChild(removedNode);
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