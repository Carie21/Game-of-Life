const canvas = document.getElementById("gridCanvas");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const clearButton = document.getElementById("clearButton");
const h2 = document.getElementById("h2")
const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");

var ctx = canvas.getContext("2d");
ctx.lineWidth = 0.75;

var width = canvas.width;
var height = canvas.height;

var offsetX = 0;
var offsetY = 0;

var rowWidth = 20;
var colWidth = 20;

var isDragging = false;
var initialX = 0;
var initialY = 0;
var isRunning = false;
var generation = 0;
const coloredCells = new Set();

canvas.addEventListener("mousedown", (e) => {
    isDragging = false;
    initialX = e.clientX - offsetX;
    initialY = e.clientY - offsetY;

    canvas.addEventListener("mousemove", onMouseMove);
});

canvas.addEventListener("mouseup", (e) => {
    canvas.removeEventListener("mousemove", onMouseMove);
    if (!isDragging) {
        var realX = e.clientX - canvas.getBoundingClientRect().left - offsetX;
        var realY = e.clientY - canvas.getBoundingClientRect().top - offsetY;
        var col = Math.floor(realX / colWidth);
        var row = Math.floor(realY / rowWidth);
        var cell = `${col},${row}`;
        if (!coloredCells.has(cell)) {
            coloredCells.add(cell);
        } else {
            coloredCells.delete(cell);
        }
        drawGrid();
    }
});

stopButton.addEventListener("click", (e) => {
    isRunning = false;
});

startButton.addEventListener("click", (e) => {
    if(!(isRunning)){
        isRunning = true;
        game();
    }
    
});

clearButton.addEventListener("click",()=>{
    coloredCells.clear();
    generation = 0;
    h2.innerHTML =`Generation Number: ${generation}`;
    drawGrid();
});

zoomInButton.addEventListener("click", () => {
    if (colWidth < 100 && rowWidth < 100) {
        colWidth += 5;
        rowWidth += 5;
        drawGrid();
    }
});

zoomOutButton.addEventListener("click", () => {
    if (colWidth > 5 && rowWidth > 5) {
        colWidth -= 5;
        rowWidth -= 5;
        drawGrid();
    }
});

function onMouseMove(e) {
    isDragging = true;
    offsetX = e.clientX - initialX;
    offsetY = e.clientY - initialY;
    drawGrid();
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startCol = offsetX % colWidth;
    const startRow = offsetY % rowWidth;

    for (var i = startCol; i <= width; i += colWidth) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }

    for (var i = startRow; i <= height; i += rowWidth) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
    }

    colourCells();
}

function colourCells() {
    coloredCells.forEach(cell => {
        var [col, row] = cell.split(",").map(Number);
        var x = col * colWidth + offsetX;
        var y = row * rowWidth + offsetY;
        ctx.fillStyle = "rgb(25, 25, 112)";
        ctx.fillRect(x, y, colWidth, rowWidth);
    });
}

function updateCells(){
    const newCells = new Set();
    const cellsToCheck = new Set();

    coloredCells.forEach(cell => {
        cellsToCheck.add(cell);
        var [col, row] = cell.split(",").map(Number);
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                cellsToCheck.add(`${col + i},${row + j}`);
            }
        }
    });

    cellsToCheck.forEach(cell => {
        var [col, row] = cell.split(",").map(Number);
        var neighbors = 0;

        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                if (coloredCells.has(`${col + i},${row + j}`)) neighbors++;
            }
        }

        if (neighbors === 3 || (neighbors === 2 && coloredCells.has(cell))) {
            newCells.add(cell);
        }
    });

    coloredCells.clear();
    newCells.forEach(cell => coloredCells.add(cell));
}

function game() {
    if (isRunning) {
        updateCells();
        generation++;
        h2.innerHTML =`Generation Number: ${generation}`;
        drawGrid();
        if(coloredCells.size === 0) isRunning = false;

        setTimeout(game, 800);
    }
}

drawGrid();
