let canvasElement = /** @type {CanvasRenderingContext2D} */ document.getElementById("canvas");
let canvasContext = canvasElement.getContext("2d");

const gridSize = 10;
const canvasWidth = 400;
const canvasHeight = 600;

class Square{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.coor=`${x},${y}`;
    this.active = false;
  }
};

class Squares{
  constructor(){
    this.squares = [];
  }

  createSquares(){
    let x = 0;
    let y = 0;
    let arr = [];
    for(let i = 0; i <= ((canvasWidth / gridSize) * (canvasHeight / gridSize)); i++){
      if (x > (canvasWidth / gridSize) - 1){
        x = 0;
        y++;
        this.squares.push(arr);
        arr = [];
      }
      let newSquare = new Square(x , 0 + y);
      arr.push(newSquare);
      x++;
    } 
  }

  activateSquare(x, y){
    this.squares[y][x].active = true;
    canvasContext.rect(x * gridSize, y * gridSize, gridSize, gridSize);
    canvasContext.fillStyle='brown';
    canvasContext.fill();
    if(y < 59){
      setTimeout(this.tryFalling.bind(this,x, y), 500);
    }
  }

  tryFalling(x,y){
    if(this.squares[y][x].active){
      if(!this.squares[y + 1][x].active){
        
        this.squares[y][x].active = false;
        console.log('test');
        canvasContext.rect(x * gridSize, y * gridSize, gridSize, gridSize);
        canvasContext.fillStyle='green';
        canvasContext.fill();
        
        setTimeout(this.activateSquare.bind(this,x, y + 1), 500); 
      }
    }
  }

}

//creating the 2dimensional array of canvas grid instances of the class Square;
let gridSquares = new Squares;
gridSquares.createSquares();
console.log(gridSquares.squares);



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
  gridSquares.activateSquare(coorX, coorY);
  
});






console.log(gridSquares.squares[0][10]);

