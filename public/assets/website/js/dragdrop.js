const iventoryicons = document.querySelectorAll('.walleticon');
const empties = document.querySelectorAll('.cryptoicon');

let inconposition = null;
let idposition = null;

function dragStart(e) {
    console.log('dragstart');
    e.dataTransfer.setData('text', e.currentTarget.id);
    inconposition = this.parentNode.id;
}

function dragEnd() {
    console.log('dragend');
}

for (const inventoryicon of iventoryicons) {
    inventoryicon.addEventListener('dragstart', dragStart);
    inventoryicon.addEventListener('dragend', dragEnd);
}

function dragEnter(e) {
    e.preventDefault();
    this.className += 'hold';
}

function dragOver(e) {
    e.preventDefault();
}

function dragLeave() {
    this.className = 'empty';
}

function dragDrop(e) {
    const data = e.dataTransfer.getData('text');
    this.className = 'empty';
    if (e.target.children.length === 0 && e.target.tagName !== 'IMG') {
        e.target.appendChild(document.getElementById(data));
        idposition = inconposition;
    } else {
        const previousposition = document.getElementById(idposition);
        let dropzone;
        console.log(e.target);
        console.log(e.target.parentNode);
        if (e.target.tagName === 'TD') {
            dropzone = e.target;
            previousposition.appendChild(e.target.children[0]);
            dropzone.appendChild(document.getElementById(data));
            idposition = inconposition;
        } else {
            dropzone = e.target.parentNode;
            previousposition.appendChild(e.target);
            dropzone.appendChild(document.getElementById(data));
            idposition = inconposition;
        }
    }
}

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}
