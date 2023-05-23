import Scene from "./Scene.js";
import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

const canvasElem = document.getElementById("game-canvas");
const p1PointsElem = document.getElementById("p1-points");
const p2PointsElem = document.getElementById("p2-points");
const startTxtElem = document.getElementById("start-txt");

let lastTime = 0;
let isRunning = false;
let isGoingUp = false;
let isGoingDown = false;
let p1Points = 0;
let p2Points = 0;

const scene = new Scene(canvasElem);
const playerPaddle = new Paddle();
scene.addGameObject(playerPaddle);
const botPaddle = new Paddle();
scene.addGameObject(botPaddle);
const ball = new Ball();
scene.addGameObject(ball);
setupGame();


document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Enter": {
      if (isRunning) {
        pause("Press Enter to Resume");
      } else {
        unpause();
      }
      break;
    }
    case "ArrowUp": {
      isGoingUp = true;
      break;
    }
    case "ArrowDown": {
      isGoingDown = true;
      break;
    }
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowUp": {
      isGoingUp = false;
      break;
    }
    case "ArrowDown": {
      isGoingDown = false;
      break;
    }
  }
});


function pause(msg) {
  isRunning = false;
  startTxtElem.classList.remove("hidden");
  startTxtElem.innerText = msg;
}

function unpause() {
  isRunning = true;
  startTxtElem.classList.add("hidden");
}

function setupGame() {
  p1PointsElem.innerText = p1Points;
  p2PointsElem.innerText = p2Points;
  playerPaddle.x = Paddle.EDGE_OFFSET;
  playerPaddle.y = scene.canvas.height / 2;
  botPaddle.x = canvasElem.width - Paddle.EDGE_OFFSET;
  botPaddle.y = canvasElem.height / 2;
  ball.x = canvasElem.width / 2;
  ball.y = canvasElem.height / 2;
  // const rndAngle = Math.random() * (Math.PI / 3) - (Math.PI / 6) + (Math.round(Math.random()) * Math.PI);
  const rndAngle = (
    ((Math.SQRT2 * Math.PI / 2) + (Math.random() * (Math.PI / 18) - (Math.PI / 36))) *
    (Math.round(Math.random()) ? 1 : -1) +
    (Math.round(Math.random()) * Math.PI)
  );
  ball.xVel = Math.cos(rndAngle) * Ball.SPEED;
  ball.yVel = Math.sin(rndAngle) * Ball.SPEED;
}

function keepPaddleWithinCanvas(paddle) {
  if (paddle.y + paddle.height / 2 > canvasElem.height) {
    paddle.y = canvasElem.height - paddle.height / 2;
  } else if (paddle.y - paddle.height / 2 < 0) {
    paddle.y = paddle.height / 2;
  }
}

function updatePlayerPaddle(deltaTime) {
  if (isGoingUp && !isGoingDown) {
    playerPaddle.y -= Paddle.SPEED * deltaTime;
  }
  if (isGoingDown && !isGoingUp) {
    playerPaddle.y += Paddle.SPEED * deltaTime;
  }
  keepPaddleWithinCanvas(playerPaddle);
}

function updateBotPaddle(deltaTime) {
  if (botPaddle.y < ball.y) {
    botPaddle.y += Paddle.SPEED * deltaTime;
  } else if (botPaddle.y > ball.y) {
    botPaddle.y -= Paddle.SPEED * deltaTime;
  }
  keepPaddleWithinCanvas(botPaddle);
}

function updateBall(deltaTime) {
  ball.x += ball.xVel * deltaTime;
  ball.y += ball.yVel * deltaTime;
  if (ball.y + ball.radius > canvasElem.height || ball.y - ball.radius < 0) {
    ball.yVel *= -1;
  }
  if (playerPaddle.isBallTouchingSide(ball, true)) {
    ball.x = playerPaddle.x + playerPaddle.width / 2 + ball.radius;
    ball.xVel *= -1;
  }
  if (botPaddle.isBallTouchingSide(ball, false)) {
    ball.x = botPaddle.x - botPaddle.width / 2 - ball.radius;
    ball.xVel *= -1;
  }
  if (ball.x - ball.radius < 0) {
    p2Points++;
  } else if (ball.x + ball.radius > canvasElem.width) {
    p1Points++;
  } else {
    return;
  }
  setupGame();
  pause("Press Enter to Continue");
}

function update(deltaTime) {
  if (!isRunning) {
    return;
  }
  updatePlayerPaddle(deltaTime);
  updateBotPaddle(deltaTime);
  updateBall(deltaTime);
}

function animate(curTime) {
  update(curTime - lastTime);
  lastTime = curTime
  scene.draw();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
