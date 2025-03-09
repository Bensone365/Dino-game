const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const gameArea = document.getElementById("gameArea");

let dinoJumping = false;
let gameOver = false;

// Detect if key pressed is "space"
document.addEventListener("keydown", jump);

function jump(event) {
    if (event.code === "Space" && !dinoJumping && !gameOver) {
        dinoJumping = true;
        dino.style.transition = "none";
        dino.style.bottom = "80px";
        
        setTimeout(() => {
            dino.style.transition = "bottom 0.3s";
            dino.style.bottom = "0px";
            dinoJumping = false;
        }, 300);
    }
}

// Move the obstacle
function moveObstacle() {
    if (gameOver) return;
    let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstaclePosition >= 600) {
        obstacle.style.right = "-30px"; // Reset obstacle to the left after it moves out of screen
    } else {
        obstacle.style.right = obstaclePosition + 5 + "px"; // Move the obstacle
    }

    checkCollision();
}

// Check if the dino collides with the obstacle
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (dinoRect.left < obstacleRect.right && dinoRect.right > obstacleRect.left && dinoRect.bottom > obstacleRect.top) {
        gameOver = true;
        alert("Game Over! Refresh to play again.");
    }
}

// Start the game loop
setInterval(moveObstacle, 20);
