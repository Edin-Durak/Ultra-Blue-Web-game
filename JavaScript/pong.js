(function () {
  const pongContainer = document.querySelector(".pong-container");
  const playerPaddle = pongContainer.querySelector(".player");
  const opponentPaddle = pongContainer.querySelector(".opponent");
  const ball = pongContainer.querySelector(".ball");

  let ballSpeed = 5;
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
  let opponentSpeed = 3;

  // Paddle movement variables
  let playerPaddleDirection = 0; // 1 for down, -1 for up, 0 for stationary
  let playerPaddleSpeed = 3; // Speed at which the paddle moves
  let randomDirection = 1; // 1 for down, -1 for up

  // Adjust ball speed based on screen size
  if (window.innerWidth <= 992) {
    ballSpeed = 2; // Slower speed for smaller screens
  }

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
    ballDirX = Math.random() < 0.5 ? 1 : -1;
    ballDirY = Math.random() < 0.5 ? 1 : -1;
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

    // Ball collision with player's paddle
    if (
      ballPosX <=
        playerPaddle.offsetLeft + playerPaddle.getBoundingClientRect().width &&
      ballPosY + ballHeight >= playerPosY &&
      ballPosY <= playerPosY + playerHeight
    ) {
      ballDirX *= -1;
      ballPosX =
        playerPaddle.offsetLeft + playerPaddle.getBoundingClientRect().width;
    }

    // Ball collision with opponent's paddle
    if (
      ballPosX + ballWidth >= opponentPaddle.offsetLeft &&
      ballPosY + ballHeight >= opponentPosY &&
      ballPosY <= opponentPosY + opponentHeight
    ) {
      ballDirX *= -1;
      ballPosX = opponentPaddle.offsetLeft - ballWidth;
    }

    if (ballPosX < 0 || ballPosX > pongContainer.clientWidth) {
      resetBall();
    }

    ball.style.left = `${ballPosX}px`;
    ball.style.top = `${ballPosY}px`;

    // Move opponent paddle automatically
    if (opponentPosY >= pongHeight - opponentHeight || opponentPosY <= 0) {
      opponentSpeed *= -1;
    }
    opponentPosY += opponentSpeed;

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
  pongContainer.addEventListener("touchstart", (e) => {
    // Start moving the paddle automatically on first touch
    if (playerPaddleDirection === 0) {
      playerPaddleDirection = Math.random() < 0.5 ? 1 : -1; // Randomly choose a direction
      randomDirection = playerPaddleDirection; // Set the initial direction
    }
  });

  pongContainer.addEventListener("touchmove", (e) => {
    const touch = e.touches[0]; // Get the first touch
    const touchY = touch.clientY - pongContainer.getBoundingClientRect().top; // Get touch position

    // Change direction based on the touch position relative to the paddle
    const paddleTop =
      playerPaddle.getBoundingClientRect().top -
      pongContainer.getBoundingClientRect().top;

    // Change direction if the user touches the screen
    if (touchY < paddleTop) {
      randomDirection = -1; // Move up
    } else if (
      touchY >
      paddleTop + playerPaddle.getBoundingClientRect().height
    ) {
      randomDirection = 1; // Move down
    }

    e.preventDefault(); // Prevent scrolling when touching the screen
  });

  // Update player paddle position automatically
  function updatePlayerPaddle() {
    if (playerPaddleDirection !== 0) {
      playerPosY += randomDirection * playerPaddleSpeed;

      // Constrain paddle position within the container
      if (playerPosY < 0) playerPosY = 0;
      if (
        playerPosY >
        pongContainer.clientHeight - playerPaddle.getBoundingClientRect().height
      ) {
        playerPosY =
          pongContainer.clientHeight -
          playerPaddle.getBoundingClientRect().height;
      }
    }

    // Update the player's paddle position in the DOM
    playerPaddle.style.top = `${playerPosY}px`;
  }

  // Start the game loop
  resetBall();
  update();
})();
