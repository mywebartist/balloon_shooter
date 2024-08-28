// Get the score, missed, game over message, and reset button elements
const scoreDisplay = document.getElementById('score');
const missedDisplay = document.getElementById('missed');
const gameOverMessage = document.getElementById('gameOverMessage');
const resetButton = document.getElementById('resetButton');

// Get all balloon elements
const balloons = document.querySelectorAll('.balloon');

// Initialize counters and state variables
let score = 0;
let missed = 0;
let gameOver = false;
let balloonIntervals = [];

// Define an array of 5 different colors
const balloonColors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#FF69B4'];

// Function to change the color of the balloon's body (ellipse)
function assignRandomColor(balloon) {
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const balloonBody = balloon.querySelector('.balloon-body'); // Get the balloon body inside the SVG
    balloonBody.setAttribute('fill', randomColor); // Change the fill color of the balloon
}

// Function to reset a balloon to the bottom of the game area
function resetBalloon(balloon) {
    const gameArea = document.getElementById('gameArea');
    const randomX = Math.random() * (gameArea.offsetWidth - 50); // Random horizontal position within game area
    balloon.style.left = randomX + 'px';
    balloon.style.top = gameArea.offsetHeight - 50 + 'px'; // Start just inside the game area
    balloon.style.display = 'block'; // Make sure it's visible
    assignRandomColor(balloon); // Assign a random color to the balloon
}

// Function to move balloons
function moveBalloon(balloon, speed) {
    if (gameOver) return; // Stop moving if the game is over

    const balloonTop = parseFloat(balloon.style.top);

    // If the balloon moves off the top of the screen, count it as missed and reset
    if (balloonTop < -50) {
        missed += 1; // Increase the missed counter
        missedDisplay.textContent = missed;

        if (missed >= 10) {
            endGame(); // End the game if 10 balloons are missed
        } else {
            resetBalloon(balloon);
        }
    } else {
        balloon.style.top = (balloonTop - speed) + 'px'; // Move the balloon upwards
    }
}

// Function to handle shooting a balloon
balloons.forEach((balloon) => {
    balloon.addEventListener('click', function (event) {
        if (gameOver) return; // Don't allow shooting if the game is over

        event.stopPropagation(); // Prevent missed shot when clicking on balloon
        score += 1;
        scoreDisplay.textContent = score;
        resetBalloon(balloon); // Reset this specific balloon after being shot
    });
});

// Function to start the balloon movement and set their intervals
function startBalloonMovement() {
    balloons.forEach((balloon) => {
        resetBalloon(balloon); // Initial balloon reset
        const speed = Math.random() * 2 + 2; // Different speed for each balloon
        const intervalId = setInterval(() => moveBalloon(balloon, speed), 30);
        balloonIntervals.push(intervalId); // Store the interval for later clearing
    });
}

// Function to end the game
function endGame() {
    gameOver = true;
    gameOverMessage.style.display = 'block'; // Show the Game Over message
    resetButton.style.display = 'block'; // Show the Reset button
    // Stop all balloon movement
    balloonIntervals.forEach(intervalId => clearInterval(intervalId));
}

// Function to reset the game
function resetGame() {
    gameOver = false;
    score = 0;
    missed = 0;
    scoreDisplay.textContent = score;
    missedDisplay.textContent = missed;
    gameOverMessage.style.display = 'none'; // Hide the Game Over message
    resetButton.style.display = 'none'; // Hide the Reset button
    balloonIntervals = []; // Clear balloon intervals array
    startBalloonMovement(); // Restart the balloon movement
}

// Attach reset button click event
resetButton.addEventListener('click', resetGame);

// Start the game
startBalloonMovement();
