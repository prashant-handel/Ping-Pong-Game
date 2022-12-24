let snakeBody = [{x: 4, y: 5}];
let timer = true;

let gameBoardEl = document.querySelector(".gameBoard");
let lastPaintTime = 0;
let speed = 5;
let inputDirection = {x: 0, y: 1}
let applePosition = {x: 4, y: 8}
const scoreEl = document.getElementById("score");
let score = 0;
const gameoverImg = document.querySelector(".gameover");
let isPaused = false;
let playBtn = document.getElementById("play");
let isGameOver =false;
const foodMusic = new Audio('/audio/food.mp3');
const gameOverMusic = new Audio('/audio/gameover.mp3');
const moveMusic = new Audio('/audio/move.mp3');
const music = new Audio('/audio/music.mp3');
const musicOnBtn = document.getElementById("musicOnBtn");
const musicOffBtn = document.getElementById("musicOffBtn");

// Accessing touch controls for mobiles and tableets
const leftImgEl = document.getElementById("leftImg");
const rightImgEl = document.getElementById("rightImg");
const upImgEl = document.getElementById("upImg");
const downImgEl = document.getElementById("downImg");

// Game Function
function main(ctime){
    if(!isPaused){
        window.requestAnimationFrame(main);
        if(((ctime - lastPaintTime)/1000) < 1/speed){
            return;
    }
    lastPaintTime = ctime;
    update();
    }
}

// Calling for request animation frame for the first time
window.requestAnimationFrame(main);

// Music on function
musicOnBtn.addEventListener("click", ()=>{
    music.play();
});

// Music off function
musicOffBtn.addEventListener("click", ()=>{
    music.pause();
});

function drawSnake(){
    snakeBody.forEach((element, index) =>{
        let snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.transform = "rotate(0deg)";
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        gameBoardEl.appendChild(snakeElement);
        
        if(inputDirection.x == 1){
                snakeElement.style.transform = "rotate(-90deg)";
            }
        else if(inputDirection.x == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }
        else if(inputDirection.y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }
        })
}

// Updating snake according to movement 
function 
update(){
    undraw();
    drawSnake();
    appleShow();
    eatApple();
    snakeMove();
    gameover();
}

// Moving snake in any direction
function snakeMove(){
    // moving whole body of the in a line
    for(i = snakeBody.length - 2; i >= 0; i--){
    snakeBody[i+1] = {...snakeBody[i]};
}

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function moveUp(){
    inputDirection = {x: 0, y: -1}
}
function moveDown(){
    inputDirection = {x: 0, y: 1}
}
function moveLeft(){
    inputDirection = {x: -1, y: 0}
}
function moveRight(){
    inputDirection = {x: 1, y: 0}
}

function control(e) {
    if (timer) {
      if (e.keyCode === 37 && inputDirection.x != 1) {
        moveMusic.play();
        moveLeft();
    } else if (e.keyCode === 38 && inputDirection.y != 1) {
        moveMusic.play();
        moveUp();
    } else if (e.keyCode === 39 && inputDirection.x != -1) {
        moveMusic.play();
        moveRight();
    } else if (e.keyCode === 40 && inputDirection.y != -1) {
        moveMusic.play();
        moveDown();
      } 
      // pause and play using space key
      else if (e.keyCode === 32) {
        playFunction();
      }
    }
  }
  window.addEventListener("keydown", control);

// Clearing board every time
function undraw(){
    gameBoardEl.innerHTML = "";
}

// show  apple for the first time
function appleShow(){
    let apple = document.createElement('div');
    apple.style.gridColumnStart = applePosition.x;
    apple.style.gridRowStart = applePosition.y;
    apple.classList.add('apple');
    gameBoardEl.appendChild(apple);
}

// apple eating function and incresing score and adding elements to the snake
function eatApple(){
    if(applePosition.x == snakeBody[0].x && applePosition.y == snakeBody[0].y){
        foodMusic.play();
        // assigning new position to the apple
        applePosition = {x: Math.ceil(Math.random() * 16), y: Math.ceil(Math.random() * 16)};

        // add element to the snake
        snakeBody.push(snakeBody.length);

        // increasing speed
        if(speed<= 10){
        speed++;
        }   
        // update score
        score++;
        scoreEl.innerHTML = score;
}
}
// for collision and gameover

function gameover(){
    for(i=1; i< snakeBody.length; i++){
        if(snakeBody[0].x == snakeBody[i].x && snakeBody[0].y == snakeBody[i].y){
            gameoverImg.style.display = 'flex';
            inputDirection = {x: 0, y: 0}
            isPaused = true;
            gameOverMusic.play();
            isGameOver = true;
        }    
    }
    if(snakeBody[0].x <= 0 || snakeBody[0].x >= 17 || snakeBody[0].y <= 0 || snakeBody[0].y >= 17){
        gameoverImg.style.display = 'flex';
        inputDirection = {x: 0, y: 0}
        isPaused = true;
        gameOverMusic.play();
        isGameOver = true;
    }
}

// Add functionality to paly/ pause button
playBtn.addEventListener("click", playFunction);

function playFunction(){
    if(isGameOver){
        window.requestAnimationFrame(main);
        location.reload(true);
        inputDirection = {x: 0, y: 1}
        applePosition = {x: 5, y: 8}
        snakeBody = [{x: 4, y: 5}];
    }
    else if(!isPaused){
        timer = true;
        isPaused = true;
    }
    else if(isPaused){
        timer = false;
        isPaused = false;
        window.requestAnimationFrame(main);
    }
}

// Controlling gamee using image buttons

    leftImgEl.addEventListener("click",()=>{
        if (inputDirection.x != 1){
        moveMusic.play();
        moveLeft();
        }
    })
    rightImgEl.addEventListener("click",()=>{
        if (inputDirection.x != -1){
        moveMusic.play();
        moveRight();
        }
    })
    downImgEl.addEventListener("click",()=>{
        if (inputDirection.y != -1){
        moveMusic.play();
        moveDown();
        }
    })
    upImgEl.addEventListener("click",()=>{
        if (inputDirection.y != 1){
        moveMusic.play();
        moveUp();
        }
    })