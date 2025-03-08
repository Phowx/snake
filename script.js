const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;
let gameInterval;
let gameRunning = false; // 添加一个标志，表示游戏是否正在运行

function draw() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function update() {
    if (!gameRunning) return; // 如果游戏没有运行，则不更新

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `分数: ${score}`;
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
    } else {
        snake.pop(); // 移除尾部
    }

    // 检查是否撞到边界或自身
    if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize || checkCollision(head)) {
        gameOver();
        return;
    }

    snake.unshift(head); // 添加头部
    draw();
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameInterval);
    alert(`游戏结束！你的分数是: ${score}`);
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 1;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = `分数: ${score}`;
    gameRunning = false;
    startButton.style.display = 'block'; // 显示开始按钮
}

function startGame() {
    gameRunning = true;
    startButton.style.display = 'none'; // 隐藏开始按钮
    gameInterval = setInterval(update, 100);
}

document.addEventListener('keydown', event => {
    if (!gameRunning) return; // 如果游戏没有运行，则不响应按键

    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

startButton.addEventListener('click', () => {
    if (!gameRunning){
        startGame();
    }
});
