let canvasElement = /** @type {CanvasRenderingContext2D} */ document.getElementById("canvas");
let canvasContext = canvasElement.getContext("2d");

const gridSize = 10;
const canvasWidth = 400;
const canvasHeight = 600;
const runtime = 5000;

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

  drawSquares(){
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    for(let row = 0; row < 60; row ++){
      for(let col = 0; col < 40; col++){

        if (this.squares[row][col].active){
          canvasContext.beginPath();
          canvasContext.rect(col * gridSize, row * gridSize, gridSize, gridSize);
          canvasContext.fillStyle='brown';
          canvasContext.fill();

        }
      }
    }
    createGrid();
  }


  activateSquare(x, y){
    this.squares[y][x].active = true;    
  }
  
  tryFallingDown(){
    let arr = [];
    for(let row = 0; row < 60; row ++){
      for(let col = 0; col < 40; col++){
        if(this.squares[row][col].active && col < 59 && !this.squares[row + 1][col].active){
          console.log(this.squares[row][col]);
          let coor = [row, col];
          arr.push(coor);
        }
      }
    }
    console.log(arr);//pick up HEREarr [[1,2]]
    for(let i = 0; i <= arr.length; i++){
      console.log("y: " + arr[i][0]);
      console.log(arr[i][1]);
      let y = arr[i][0];
      let x = arr[i][1];
      this.squares[y][x].active = false;
      this.squares[y + 1][x].active = true;

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




//gridSquares.squares[0][10].active = true;

//console.log(gridSquares.squares[0][10]);

let running = true;

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
async function repeatedGreetingsLoop() {
  while(running) {
    await sleepNow(runtime)
    gridSquares.drawSquares();
    gridSquares.tryFallingDown();
  }
}

repeatedGreetingsLoop();

