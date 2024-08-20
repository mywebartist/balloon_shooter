// Get the score and missed elements
const scoreDisplay = document.getElementById('score');
const missedDisplay = document.getElementById('missed');

// Get all balloon elements
const balloons = document.querySelectorAll('.balloon');

// Initialize counters
let score = 0;
let missed = 0;

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
    const balloonTop = parseFloat(balloon.style.top);

    // If the balloon moves off the top of the screen, count it as missed and reset
    if (balloonTop < -50) {
        missed += 1; // Increase the missed counter
        missedDisplay.textContent = missed;
        resetBalloon(balloon);
    } else {
        balloon.style.top = (balloonTop - speed) + 'px'; // Move the balloon upwards
    }
}

// Function to handle shooting a balloon
balloons.forEach((balloon) => {
    balloon.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent missed shot when clicking on balloon
        score += 1;
        scoreDisplay.textContent = score;
        resetBalloon(balloon); // Reset this specific balloon after being shot
    });
});

// Set intervals for each balloon to move at different speeds
balloons.forEach((balloon) => {
    resetBalloon(balloon); // Initial balloon reset
    const speed = Math.random() * 10 + 2; // Different speed for each balloon
    setInterval(() => moveBalloon(balloon, speed), 30);
});
