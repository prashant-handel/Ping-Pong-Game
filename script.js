const canvasEl = document.getElementById("canvas");
const context = canvasEl.getContext("2d");

const width = "600"
const height = "400"

const paddleWidth = 10;
const paddleHeight = 50;

canvasEl.width = width;
canvasEl.height = height;

let lastPaintTime = 0;
let speed = 80;

// Game Function
function main(ctime){
        window.requestAnimationFrame(main);
        if(((ctime - lastPaintTime)/1000) < 1/speed){
            return;
        }
    lastPaintTime = ctime;
    start();
    }

window.requestAnimationFrame(main)

//Creating a rectangle using fillRect() method
function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// Left paddle
const user1 = {
    x: 10,
    y: canvasEl.height/2 - paddleHeight/2,
    width: 10,
    height: 50,
    color: "white",
    score: 0
}

// Right paddle
const user2 = {
    x: width - 20,
    y: canvasEl.height/2 - paddleHeight/2,
    width: 10,
    height: 50,
    color: "white",
    score: 0
}

// Making center line
function centerLine(){
    context.beginPath();
    context.setLineDash([5]);
    context.moveTo(width/2, 0);
    context.lineTo(width/2, height);
    context.strokeStyle = "white";
    context.stroke();
}

// Creating a circle using arc 
function drawBall(x,y,radius,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

const ball = {
    x: canvasEl.width/2,
    y: canvasEl.height/2,
    radius: 10,
    speed: 1,
    velocityX: 5,
    velocityY: 5,
    color: "white"
}

// Players Score display
function drawText(text,x,y,color){
    context.fillStyle = color
    context.font = "32px Josefin Sans";
    context.fillText(text, x, y);
}


function render(){
    // Make canvas
    drawRect(0,0,600,400,"black");
    
    // left paddle
    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);
    
    // right paddle
    drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);
    
    // Center line
    centerLine();
    
    // Creating the ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    
    // Scores of user1 and user2
    drawText(user1.score, width/2 - 50, 40);
    drawText(user2.score, width/2 + 20, 40);
}

render();

// Undrawing the Canvas
function undraw(){
    canvasEl.innerHTML = "";
}

// Working starts here
// update
function update(){
    undraw();

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // reflect from top and bottom walls of the box
    if(ball.y + ball.radius > canvasEl.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }
}
// Moving paddles
function control(e){
    if (e.keyCode === 38){
        if(user2.y > 0)
        user2.y -= 30;
    }
    else if (e.keyCode === 40){
        if(user2.y + paddleHeight < height)
        user2.y += 30;
    }
    else if(e.keyCode === 87){
        if(user1.y > 0)
        user1.y -= 30;
    }
    else if(e.keyCode === 83){
        if(user1.y + paddleHeight < height)
        user1.y += 30;
    }
}

// Striking on paddle function
function paddleStrike(){
    if(ball.x + ball.radius == user2.x && ball.y + ball.radius >= user2.y && ball.y - ball.radius <= user2.y + paddleHeight){
        ball.velocityX = -ball.velocityX;  
    }
    else if(ball.x - ball.radius == user1.x + paddleWidth && ball.y + ball.radius >= user1.y && ball.y - ball.radius <= user1.y + paddleHeight){
        ball.velocityX = -ball.velocityX;
    }
}

function pointsUpdate(){
    if(ball.x <= 0){
        user2.score++;
    }
    else if(ball.x >= width){
        user1.score++;
    }
}

// Starting the game
function start(){
    update();
    render();
    // Adding keyboard events for controls
    window.addEventListener("keydown",control);
    paddleStrike();
    pointsUpdate();
}


