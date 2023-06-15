const grid = document.querySelector('.grid');
const slider = document.querySelector('#myRange');
const rangeValue = document.querySelector('#rangeValue');
const toggleGridlines = document.querySelector('.gridlines-btn');
const clear = document.querySelector('.clear-btn');
const pen = document.querySelector('#pen');
const gridColor = document.querySelector('#grid-color');

let mousePressed = false;

// allows to click and hold to draw
document.body.addEventListener('mousedown', () => {
    mousePressed = true;
})
document.body.addEventListener('mouseup', () => {
    mousePressed = false;
})

clear.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = gridColor.value;
    })
})



toggleGridlines.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.toggle('nogrid');
    })
})

gridColor.addEventListener('input', () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if(!cell.classList.contains('drawn')) {
            cell.style.backgroundColor = gridColor.value;
        }
    })
})

slider.addEventListener('input', () => {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        row.remove();
    })
    createGrid();
    rangeValue.textContent = `Grid size: ${slider.value} x ${slider.value}`;
})

const createGrid = () => {
    const dimension = slider.value;
    const cellSize = grid.clientWidth / slider.value;
    for(let i = 0; i < dimension; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < dimension; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';
            row.appendChild(cell);
            cell.addEventListener('mousedown', changeColor);
            cell.addEventListener('mouseover', changeColor);
        }
        grid.appendChild(row);
    }
}

const changeColor = (event) => {
    if(event.type === 'mouseover' && !mousePressed) return;
    event.target.style.backgroundColor = pen.value;
    event.target.classList.add('drawn');
    console.log(event.target.style);
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    rangeValue.textContent = `Grid size: ${slider.value} x ${slider.value}`;
})
