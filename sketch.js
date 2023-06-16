const DEFAULT_PEN_COLOR = '#000000';
const DEFAULT_GRID_COLOR = '#ffffff';
const DEFAULT_GRID_SIZE = 16;

const grid = document.querySelector('.grid');
const slider = document.querySelector('#myRange');
const rangeValue = document.querySelector('#rangeValue');
const toggleGridlines = document.querySelector('.gridlines-btn');
const clear = document.querySelector('.clear-btn');
const reset = document.querySelector('.reset-btn')
let pen = document.querySelector('#pen');
let gridColor = document.querySelector('#grid-color');

let mousePressed = false;
let gridlineToggled = false;

const createGrid = (dimension) => {
    const cellSize = grid.clientWidth / dimension;
    for(let i = 0; i < dimension; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < dimension; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';
            cell.style.backgroundColor = gridColor.value;
            if(gridlineToggled) cell.classList.add('gridline');
            row.appendChild(cell);
            cell.addEventListener('mousedown', changeColor);
            cell.addEventListener('mouseover', changeColor);
        }
        grid.appendChild(row);
    }
}

const resetGrid = () => {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        row.remove();
    })
    pen.value = DEFAULT_PEN_COLOR;
    gridColor.value = DEFAULT_GRID_COLOR;
    slider.value = DEFAULT_GRID_SIZE;
    rangeValue.textContent = `Grid size: ${slider.value} x ${slider.value}`;
    createGrid(slider.value);
}

const changeColor = (event) => {
    if(event.type === 'mouseover' && !mousePressed) return;
    event.target.style.backgroundColor = pen.value;
    event.target.classList.add('drawn');
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid(slider.value);
    rangeValue.textContent = `Grid size: ${slider.value} x ${slider.value}`;
})

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
        cell.classList.remove('drawn');
    })
})

toggleGridlines.addEventListener('click', () => {
    const cells = document.querySelectorAll('.cell');
    gridlineToggled = !gridlineToggled;
    cells.forEach(cell => {
        cell.classList.toggle('gridline');
    })
})

reset.addEventListener('click', resetGrid);

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
    createGrid(slider.value);
    rangeValue.textContent = `Grid size: ${slider.value} x ${slider.value}`;
})