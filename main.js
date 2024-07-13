let canvasElement = /** @type {CanvasRenderingContext2D} */ document.getElementById("canvas");
let canvasContext = canvasElement.getContext("2d");
const gridSize = 10;

//square 59 is bottom of canvas grid
//square 39 is furthest of canvas

function createGrid(){
  //creating vertical lines
  for(let i = 1; i < 40; i++){
    canvasContext.moveTo(gridSize * i, 0);
    canvasContext.lineTo(gridSize * i, 600);
  }
  //creating horizontal lines
  for(let i = 1; i < 60; i++){
    canvasContext.moveTo(0, gridSize * i);
    canvasContext.lineTo(400, gridSize * i);
  }
  canvasContext.stroke();
}


createGrid();

function colorGrid(x, y){
  canvasContext.rect(x * gridSize, y * gridSize, gridSize, gridSize);
  canvasContext.fillStyle='brown';
  canvasContext.fill();
}

//converting mouse position on canvas to desired grid coordinate
function getMousePosition(canvas, event){
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  let [gridX, gridY] = [Math.floor(x /10), Math.floor(y /10)];
  console.log("Coordinate x: " + gridX, "Coordinate y: " + gridY);
}

//Event listener for mouse click
canvasElement.addEventListener("mousedown", function (e) {
  getMousePosition(canvasElement, e);
});

colorGrid(2 ,2);



