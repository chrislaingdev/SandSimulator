let canvasElement = /** @type {CanvasRenderingContext2D} */ document.getElementById("canvas");
let canvasContext = canvasElement.getContext("2d");
const gridSize = 10;
const canvasWidth = 400;
const canvasHeight = 600;

//square 59 is bottom of canvas grid
//square 39 is furthest of canvas

function createGrid(){
  //creating vertical lines
  for(let i = 1; i < canvasWidth / gridSize; i++){
    canvasContext.moveTo(gridSize * i, 0);
    canvasContext.lineTo(gridSize * i, canvasHeight);
  }
  //creating horizontal lines
  for(let i = 1; i < canvasHeight / gridSize; i++){
    canvasContext.moveTo(0, gridSize * i);
    canvasContext.lineTo(canvasWidth, gridSize * i);
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
  return [gridX, gridY]
}

//Event listener for mouse click
canvasElement.addEventListener("mousedown", function (e) {
  let [coorX, coorY] = getMousePosition(canvasElement, e);
  colorGrid(coorX, coorY);
  
});

class Square{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.active = false;
  }
};

class Squares{
  constructor(){
    this.squares = [];
  }

  createSquare(x, y){
    let newSquare = new Square(x , y);
    this.squares.push(newSquare);



  }
}

let testSquares = new Squares;
function testCreate(){
  for(let i = 0; i < 10; i++){
    testSquares.createSquare(0, i);
  }
  
}

testCreate();

console.log(testSquares.squares[8]);








