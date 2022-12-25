const canvasEl = document.getElementById("canvas");
const context = canvasEl.getContext("2d");

const width = "600";
const height = "400";

const paddleWidth = 10;
const paddleHeight = 80;

canvasEl.width = width;
canvasEl.height = height;

let lastPaintTime = 0;
let speed = 100;
let isPaused = false;
let gameOverEl = document.querySelector(".gameOver");
player1 = document.querySelector(".player1");
player2 = document.querySelector(".player2");
let up = false;
let down = false;
let w = false;
let s = false;

// Game Function
function main(ctime) {
  if (!isPaused) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
      return;
    }
    lastPaintTime = ctime;
    start();
  }
}

window.requestAnimationFrame(main);

//Creating a rectangle using fillRect() method
function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

// Left paddle
const user1 = {
  x: 10,
  y: canvasEl.height / 2 - paddleHeight / 2,
  width: 10,
  height: 80,
  color: "white",
  score: 0,
};

// Right paddle
const user2 = {
  x: width - 20,
  y: canvasEl.height / 2 - paddleHeight / 2,
  width: 10,
  height: 80,
  color: "white",
  score: 0,
};

// Making center line
function centerLine() {
  context.beginPath();
  context.setLineDash([5]);
  context.moveTo(width / 2, 0);
  context.lineTo(width / 2, height);
  context.strokeStyle = "white";
  context.stroke();
}

// Creating a circle using arc
function drawBall(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

const ball = {
  x: canvasEl.width / 2,
  y: canvasEl.height / 2,
  radius: 10,
  velocityX: 5,
  velocityY: 5,
  color: "white"
};

// Players Score display
function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "32px Josefin Sans";
  context.fillText(text, x, y);
}

function render() {
  // Make canvas
  drawRect(0, 0, 600, 400, "black");

  // left paddle
  drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);

  // right paddle
  drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);

  // Center line
  centerLine();

  // Creating the ball
  drawBall(ball.x, ball.y, ball.radius, ball.color);

  // Scores of user1 and user2
  drawText(user1.score, width / 2 - 50, 40);
  drawText(user2.score, width / 2 + 20, 40);
}

render();

// Working starts here
// update

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // reflect from top and bottom walls of the box
  if (ball.y + ball.radius > canvasEl.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }
  paddleStrike();
}
function keyPressed(e) {
  if (e.keyCode === 38) {
    up = true;
  } else if (e.keyCode === 40) {
    down = true;
  } else if (e.keyCode === 87) {
    w = true;
  } else if (e.keyCode === 83) {
    s = true;
  } else if (e.keyCode === 32) {
    if (isPaused) {
      isPaused = false;
      window.requestAnimationFrame(main);
    } else {
      isPaused = true;
    }
  }
  control();
}

function control(){
  if (up == true) {
    if (user2.y > 0) user2.y -= 35;
  }
  if (down == true) {
    if (user2.y + paddleHeight < height) user2.y += 35;
  }
  if (w == true) {
    if (user1.y > 0) user1.y -= 35;
  }
  if (s == true) {
    if (user1.y + paddleHeight < height) user1.y += 35;
  }
}

function keyUp(e){
  if (e.keyCode === 38) {
    up = false;
  } else if (e.keyCode === 40) {
    down = false;
  } else if (e.keyCode === 87) {
    w = false;
  } else if (e.keyCode === 83) {
    s = false;
  }
}
  
// Moving paddles
// function control(e) {
//   if (e.keyCode === 38) {
//     if (user2.y > 0) user2.y -= 35;
//   } else if (e.keyCode === 40) {
//     if (user2.y + paddleHeight < height) user2.y += 35;
//   } else if (e.keyCode === 87) {
//     if (user1.y > 0) user1.y -= 35;
//   } else if (e.keyCode === 83) {
//     if (user1.y + paddleHeight < height) user1.y += 35;
//   } else if (e.keyCode === 32) {
//     if (isPaused) {
//       isPaused = false;
//       window.requestAnimationFrame(main);
//     } else {
//       isPaused = true;
//     }
//   }
// }

// Striking on paddle function
function paddleStrike() {
  if (
    ball.x + ball.radius == user2.x &&
    ball.y + ball.radius >= user2.y &&
    ball.y - ball.radius <= user2.y + paddleHeight
  ) {
    ball.velocityX = -ball.velocityX;
  } else if (
    ball.x - ball.radius == user1.x + paddleWidth &&
    ball.y + ball.radius >= user1.y &&
    ball.y - ball.radius <= user1.y + paddleHeight
  ) {
    ball.velocityX = -ball.velocityX;
  }
}

function reset() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.velocityX = -ball.velocityX;
}

function pointsUpdate() {
  if (ball.x <= 0) {
    user2.score++;
    reset();
  } else if (ball.x >= width) {
    user1.score++;
    reset();
  }
}

// game over function
function gameOver() {
  if (user1.score == 5) {
    isPaused = true;
    player1.style.display = "block";
    gameOverEl.style.display = "block";
  } else if (user2.score == 5) {
    isPaused = true;
    player2.style.display = "block";
    gameOverEl.style.display = "block";
  }
}

// Starting the game
function start() {
  window.addEventListener("keydown", keyPressed);
  window.addEventListener("keyup", keyUp);
  update();
  render();
  // Adding keyboard events for controls
  pointsUpdate();
  gameOver();
}
