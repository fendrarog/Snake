const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const up = document.getElementById("up");
const left = document.getElementById("left");
const right = document.getElementById("right");
const down = document.getElementById("down");
const retry = document.getElementById("retry");

const foodIcon = new Image();
foodIcon.src = "./img/cheese.png";

let box = 24;

let score = 0;

let food = {
  x: Math.floor(Math.random() * 15) * box,
  y: Math.floor(Math.random() * 15) * box,
};

let snake = [];
snake[0] = {
  x: 7 * box,
  y: 7 * box,
};

retry.addEventListener("click", function () {
  location.reload();
});
document.addEventListener("click", setDirectionNav);
document.addEventListener("keydown", setDirection);
let direction;

function setDirectionNav(e) {
  if (e.target === left && direction != "right") {
    direction = "left";
  }
  if (e.target === up && direction != "down") {
    direction = "up";
  }
  if (e.target === right && direction != "left") {
    direction = "right";
  }
  if (e.target === down && direction != "up") {
    direction = "down";
  }
}

function setDirection(e) {
  if (e.keyCode === 37 && direction != "right") {
    direction = "left";
  }
  if (e.keyCode === 38 && direction != "down") {
    direction = "up";
  }
  if (e.keyCode === 39 && direction != "left") {
    direction = "right";
  }
  if (e.keyCode === 40 && direction != "up") {
    direction = "down";
  }
}

function renderApp() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, box * 15, box * 15);

  ctx.drawImage(foodIcon, food.x, food.y);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "rgb(71, 171, 71)" : "rgb(13, 247, 13)";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 15) * box,
      y: Math.floor(Math.random() * 15) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 13 || snakeY < box || snakeY > box * 13) {
    clearInterval(refreshFrames);
  }
  if (direction === "left") snakeX -= box;
  if (direction === "up") snakeY -= box;
  if (direction === "right") snakeX += box;
  if (direction === "down") snakeY += box;

  let updatedSnakeHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(updatedSnakeHead);

  ctx.beginPath();
  ctx.lineWidth = 2;
  for (i = 0; i <= 15; i++) {
    ctx.moveTo(0, i * box);
    ctx.lineTo(box * 15, i * box);
  }
  for (i = 0; i <= 15; i++) {
    ctx.moveTo(i * box, 0);
    ctx.lineTo(i * box, box * 15);
  }
  ctx.stroke();
}

let refreshFrames = setInterval(renderApp, 170);
