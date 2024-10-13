(function () {
  const pongContainer = document.querySelector(".pong-container");
  const playerPaddle = pongContainer.querySelector(".player");
  const opponentPaddle = pongContainer.querySelector(".opponent");
  const ball = pongContainer.querySelector(".ball");

  let ballSpeed = 8;
  let playerPosY =
    pongContainer.clientHeight / 2 -
    playerPaddle.getBoundingClientRect().height / 2;
  let opponentPosY =
    pongContainer.clientHeight / 2 -
    opponentPaddle.getBoundingClientRect().height / 2;
  let ballPosX =
    pongContainer.clientWidth / 2 - ball.getBoundingClientRect().width / 2;
  let ballPosY =
    pongContainer.clientHeight / 2 - ball.getBoundingClientRect().height / 2;
  let ballDirX = 1;
  let ballDirY = 1;
  let opponentSpeed = 5;

  // Function to set ball and opponent paddle speed based on screen size
  function updateSpeed() {
    if (window.innerWidth <= 992) {
      ballSpeed = 3; // Slower speed for smaller screens
      opponentSpeed = 3;
    } else {
      ballSpeed = 8; // Normal speed for larger screens
      opponentSpeed = 5;
    }
  }

  // Call updateSpeed on initial load
  updateSpeed();

  function updateSizes() {
    playerHeight = playerPaddle.getBoundingClientRect().height;
    opponentHeight = opponentPaddle.getBoundingClientRect().height;
    pongHeight = pongContainer.clientHeight;
    ballWidth = ball.getBoundingClientRect().width;
    ballHeight = ball.getBoundingClientRect().height;
  }

  function resetBall() {
    ballPosX =
      pongContainer.clientWidth / 2 - ball.getBoundingClientRect().width / 2;
    ballPosY =
      pongContainer.clientHeight / 2 - ball.getBoundingClientRect().height / 2;
    ballDirX = Math.random() < 0.5 ? -1 : -1;
    ballDirY = Math.random() < 0.5 ? -1 : 1;
  }

  function update() {
    updateSizes();

    playerPaddle.style.top = `${playerPosY}px`;
    opponentPaddle.style.top = `${opponentPosY}px`;

    ballPosX += ballDirX * ballSpeed;
    ballPosY += ballDirY * ballSpeed;

    // Ball collision with top/bottom of the container
    if (ballPosY <= 0 || ballPosY + ballHeight >= pongHeight) {
      ballDirY *= -1; // Reverse Y direction
    }

    const penetrationDepth = -15; // The amount the ball should enter the paddle before bouncing

    // Ball collision with player's paddle
    if (
      ballPosX <=
        playerPaddle.offsetLeft + playerPaddle.offsetWidth + penetrationDepth &&
      ballPosY + ballHeight >= playerPosY &&
      ballPosY <= playerPosY + playerHeight
    ) {
      // Ball direction changes after entering the paddle slightly
      ballDirX *= -1;
      // Position the ball a few pixels inside the paddle before changing direction
      ballPosX =
        playerPaddle.offsetLeft + playerPaddle.offsetWidth + penetrationDepth;
    }

    // Ball collision with opponent's paddle
    if (
      ballPosX + ballWidth >= opponentPaddle.offsetLeft - penetrationDepth &&
      ballPosY + ballHeight >= opponentPosY &&
      ballPosY <= opponentPosY + opponentHeight
    ) {
      // Ball direction changes after entering the paddle slightly
      ballDirX *= -1;
      // Position the ball a few pixels inside the opponent's paddle before changing direction
      ballPosX = opponentPaddle.offsetLeft - ballWidth - penetrationDepth;
    }

    if (ballPosX < 0 || ballPosX > pongContainer.clientWidth) {
      resetBall();
    }

    ball.style.left = `${ballPosX}px`;
    ball.style.top = `${ballPosY}px`;

    // Opponent paddle logic: follow the ball's Y position
    if (ballPosY + ballHeight / 2 > opponentPosY + opponentHeight / 2) {
      opponentPosY += opponentSpeed; // Move paddle down
    } else if (ballPosY + ballHeight / 2 < opponentPosY + opponentHeight / 2) {
      opponentPosY -= opponentSpeed; // Move paddle up
    }

    // Ensure opponent paddle stays within container bounds
    if (opponentPosY < 0) opponentPosY = 0;
    if (opponentPosY > pongHeight - opponentHeight)
      opponentPosY = pongHeight - opponentHeight;

    requestAnimationFrame(update);
  }

  // Handle mouse movement (for desktops)
  pongContainer.addEventListener("mousemove", (e) => {
    playerPosY =
      e.clientY -
      pongContainer.getBoundingClientRect().top -
      playerPaddle.getBoundingClientRect().height / 2;

    if (playerPosY < 0) playerPosY = 0;
    if (
      playerPosY >
      pongContainer.clientHeight - playerPaddle.getBoundingClientRect().height
    )
      playerPosY =
        pongContainer.clientHeight -
        playerPaddle.getBoundingClientRect().height;
  });

  // Handle touch movement (for mobile devices)
  pongContainer.addEventListener("touchmove", (e) => {
    const touch = e.touches[0]; // Get the first touch
    playerPosY =
      touch.clientY -
      pongContainer.getBoundingClientRect().top -
      playerPaddle.getBoundingClientRect().height / 2;

    if (playerPosY < 0) playerPosY = 0;
    if (
      playerPosY >
      pongContainer.clientHeight - playerPaddle.getBoundingClientRect().height
    )
      playerPosY =
        pongContainer.clientHeight -
        playerPaddle.getBoundingClientRect().height;

    e.preventDefault(); // Prevent scrolling when touching the screen
  });

  // Update speed on window resize
  window.addEventListener("resize", updateSpeed);

  // Start the game loop
  resetBall();
  update();
})();
