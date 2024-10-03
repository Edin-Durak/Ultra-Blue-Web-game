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

  // Adjust ball speed based on screen size
  if (window.innerWidth <= 992) {
    ballSpeed = 2; // Slower speed for smaller screens
  }

  // Constantly log paddle positions for debugging
  function logPaddlePositions() {
    console.log("Player Paddle Y:", playerPosY);
    console.log("Opponent Paddle Y:", opponentPosY);
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

    if (opponentPosY >= pongHeight - opponentHeight || opponentPosY <= 0) {
      opponentSpeed *= -1;
    }
    opponentPosY += opponentSpeed;

    if (opponentPosY < 0) opponentPosY = 0;
    if (opponentPosY > pongHeight - opponentHeight)
      opponentPosY = pongHeight - opponentHeight;

    logPaddlePositions();

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

  // Start the game loop
  resetBall();
  update();
})();
