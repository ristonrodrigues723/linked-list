const linkedList = document.getElementById('linkedList');
const valueInput = document.getElementById('valueInput');
const positionInput = document.getElementById('positionInput');
const messageBox = document.getElementById('messageBox');
let nodes = [];

function showMessage(message, isError = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${isError ? 'error' : 'success'}`;
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

function createNodeElement(value) {
    const nodeContainer = document.createElement('div');
    nodeContainer.className = 'node-container add-animation';

    const node = document.createElement('div');
    node.className = 'node';
    node.innerHTML = `
        <div class="node-data">${value}</div>
        <div class="node-next">Next</div>
    `;
    node.onclick = () => displayNodeInfo(node);

    const arrow = document.createElement('div');
    arrow.className = 'arrow';

    nodeContainer.appendChild(node);
    nodeContainer.appendChild(arrow);

    setTimeout(() => nodeContainer.classList.remove('add-animation'), 300);
    return nodeContainer;
}

function updateArrows() {
    const circularArrow = document.querySelector('.circular-arrow');
    if (circularArrow) {
        circularArrow.remove();
    }

    if (nodes.length > 0) {
        const newCircularArrow = document.createElement('div');
        newCircularArrow.className = 'circular-arrow';
        linkedList.appendChild(newCircularArrow);
    }

    nodes.forEach((container, index) => {
        const arrow = container.querySelector('.arrow');
        arrow.style.display = index < nodes.length - 1 ? 'block' : 'none';
        
        const nodeNext = container.querySelector('.node-next');
        nodeNext.textContent = index < nodes.length - 1 ? 'Next' : 'Head';
    });

    if (nodes.length > 1) {
        const lastNodeArrow = document.createElement('div');
        lastNodeArrow.className = 'last-node-arrow';
        linkedList.appendChild(lastNodeArrow);

        const firstNodeRect = nodes[0].getBoundingClientRect();
        const lastNodeRect = nodes[nodes.length - 1].getBoundingClientRect();
        const containerRect = linkedList.getBoundingClientRect();

        lastNodeArrow.style.width = `${lastNodeRect.right - firstNodeRect.left}px`;
        lastNodeArrow.style.left = `${firstNodeRect.left - containerRect.left}px`;
    }
}

function displayNodeInfo(node) {
    const index = nodes.findIndex(n => n.querySelector('.node') === node);
    const nextIndex = (index + 1) % nodes.length;
    const nextValue = nodes[nextIndex].querySelector('.node-data').textContent;
    showMessage(`Node ${index + 1}: Data = ${node.querySelector('.node-data').textContent}, Next = ${nextValue}`);
}

function addNode() {
    const value = valueInput.value || nodes.length + 1;
    if (nodes.length < 15) {
        const node = createNodeElement(value);
        linkedList.appendChild(node);
        nodes.push(node);
        valueInput.value = '';
        updateArrows();
        showMessage(`Node with value ${value} added successfully.`);
    } else {
        showMessage("Maximum number of nodes reached (15).", true);
    }
}

function insertNode() {
    const value = valueInput.value || nodes.length + 1;
    let position = parseInt(positionInput.value) - 1;
    if (isNaN(position) || position < 0) position = 0;
    if (position > nodes.length) position = nodes.length;

    if (nodes.length < 15) {
        const node = createNodeElement(value);
        if (position === nodes.length) {
            linkedList.appendChild(node);
        } else {
            linkedList.insertBefore(node, nodes[position]);
        }
        nodes.splice(position, 0, node);
        valueInput.value = '';
        positionInput.value = '';
        updateArrows();
        showMessage(`Node with value ${value} inserted at position ${position + 1}.`);
    } else {
        showMessage("Maximum number of nodes reached (15).", true);
    }
}

function removeNode() {
    if (nodes.length > 0) {
        const lastNode = nodes.pop();
        lastNode.classList.add('remove-animation');
        setTimeout(() => linkedList.removeChild(lastNode), 300);
        updateArrows();
        showMessage("Last node removed successfully.");
    } else {
        showMessage("The list is already empty.", true);
    }
}

function deleteNode() {
    const value = valueInput.value;
    const index = nodes.findIndex(node => node.querySelector('.node-data').textContent === value);
    if (index !== -1) {
        const node = nodes[index];
        node.classList.add('remove-animation');
        setTimeout(() => {
            linkedList.removeChild(node);
            nodes.splice(index, 1);
            updateArrows();
        }, 300);
        valueInput.value = '';
        showMessage(`Node with value ${value} deleted successfully.`);
    } else {
        showMessage(`Value ${value} not found in the list.`, true);
    }
}

function searchNode() {
    const value = valueInput.value;
    nodes.forEach(node => node.querySelector('.node').classList.remove('highlight'));
    const found = nodes.filter(node => node.querySelector('.node-data').textContent === value);
    if (found.length > 0) {
        found.forEach(node => node.querySelector('.node').classList.add('highlight'));
        setTimeout(() => found.forEach(node => node.querySelector('.node').classList.remove('highlight')), 2000);
        showMessage(`Value ${value} found in the list.`);
    } else {
        showMessage(`Value ${value} not found in the list.`, true);
    }
    valueInput.value = '';
}

function reverseList() {
    nodes.reverse();
    while (linkedList.firstChild) {
        linkedList.removeChild(linkedList.firstChild);
    }
    nodes.forEach(node => linkedList.appendChild(node));
    updateArrows();
    showMessage("List reversed successfully.");
}

function clearList() {
    nodes.forEach(node => {
        node.classList.add('remove-animation');
    });
    setTimeout(() => {
        linkedList.innerHTML = '';
        nodes = [];
        updateArrows();
        showMessage("List cleared successfully.");
    }, 300);
}

// Initialize with 5 nodes
for (let i = 0; i < 5; i++) {
    addNode();
}
updateArrows();