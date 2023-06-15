const grid = document.querySelector('.grid');
const slider = document.querySelector('#myRange');
const rangeValue = document.querySelector('#rangeValue');

slider.addEventListener('change', () => {
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
        }
        grid.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    rangeValue.textContent = `Grid size: ${slider.value} x ${slider.value}`;
})
