(function () {
  const pongContainer = document.querySelector(".pong-container");
  const playerPaddle = pongContainer.querySelector(".player");
  const opponentPaddle = pongContainer.querySelector(".opponent");
  const ball = pongContainer.querySelector(".ball");

  let ballSpeed = 5;
  let playerPosY =
    pongContainer.clientHeight / 2 - playerPaddle.clientHeight / 2;
  let opponentPosY =
    pongContainer.clientHeight / 2 - opponentPaddle.clientHeight / 2;
  let ballPosX = pongContainer.clientWidth / 2 - ball.clientWidth / 2;
  let ballPosY = pongContainer.clientHeight / 2 - ball.clientHeight / 2;
  let ballDirX = 1; // Ball direction in X
  let ballDirY = 1; // Ball direction in Y
  let opponentSpeed = 3; // Constant speed for opponent paddle

  // Adjust ball speed based on screen size
  if (window.innerWidth <= 992) {
    // For mobile devices
    ballSpeed = 2; // Slower speed
  } else {
    // For larger screens
    ballSpeed = 5; // Normal speed
  }

  function resetBall() {
    ballPosX = pongContainer.clientWidth / 2 - ball.clientWidth / 2;
    ballPosY = pongContainer.clientHeight / 2 - ball.clientHeight / 2;
    ballDirX = Math.random() < 0.5 ? 1 : -1; // Randomize initial direction
    ballDirY = Math.random() < 0.5 ? 1 : -1; // Randomize initial direction
  }

  function update() {
    // Get updated container and paddle dimensions on each frame
    const paddleHeight = playerPaddle.clientHeight;
    const pongHeight = pongContainer.clientHeight;

    // Update player's paddle position
    playerPaddle.style.top = `${playerPosY}px`;

    // Update opponent's paddle position
    opponentPaddle.style.top = `${opponentPosY}px`;

    // Update ball position
    ballPosX += ballDirX * ballSpeed;
    ballPosY += ballDirY * ballSpeed;

    // Ball collision with top/bottom of the container
    if (ballPosY <= 0 || ballPosY >= pongHeight - ball.clientHeight) {
      ballDirY *= -1; // Reverse Y direction
    }

    // Ball collision with player's paddle
    if (
      ballPosX <= playerPaddle.offsetLeft + playerPaddle.clientWidth &&
      ballPosY + ball.clientHeight >= playerPosY &&
      ballPosY <= playerPosY + paddleHeight
    ) {
      ballDirX *= -1; // Reverse X direction
      ballPosX = playerPaddle.offsetLeft + playerPaddle.clientWidth; // Prevent ball from getting stuck
    }

    // Ball collision with opponent's paddle
    if (
      ballPosX + ball.clientWidth >= opponentPaddle.offsetLeft &&
      ballPosY + ball.clientHeight >= opponentPosY &&
      ballPosY <= opponentPosY + paddleHeight
    ) {
      ballDirX *= -1; // Reverse X direction
      ballPosX = opponentPaddle.offsetLeft - ball.clientWidth; // Prevent ball from getting stuck
    }

    // Reset ball if it goes out of bounds (left or right of container)
    if (ballPosX < 0 || ballPosX > pongContainer.clientWidth) {
      resetBall();
    }

    // Update ball position in the DOM
    ball.style.left = `${ballPosX}px`;
    ball.style.top = `${ballPosY}px`;

    // Move opponent's paddle
    if (opponentPosY >= pongHeight - paddleHeight || opponentPosY <= 0) {
      opponentSpeed *= -1; // Reverse direction at bounds
    }
    opponentPosY += opponentSpeed; // Move opponent paddle

    // Ensure opponent's paddle stays within bounds
    if (opponentPosY < 0) opponentPosY = 0;
    if (opponentPosY > pongHeight - paddleHeight)
      opponentPosY = pongHeight - paddleHeight;

    requestAnimationFrame(update); // Loop the game update
  }

  pongContainer.addEventListener("click", (e) => {
    if (e.button === 0) {
      const clickY =
        e.clientY -
        pongContainer.getBoundingClientRect().top -
        playerPaddle.clientHeight / 2;
      const targetY = Math.min(
        Math.max(clickY, 0),
        pongContainer.clientHeight - playerPaddle.clientHeight
      ); // Keep within bounds

      const animationDuration = 300; // duration in milliseconds
      const startY = playerPosY;
      const distance = targetY - startY;
      const startTime = performance.now();

      function animate() {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1); // Normalize to [0, 1]
        playerPosY = startY + distance * progress; // Lerp to target position
        playerPaddle.style.top = `${playerPosY}px`;

        if (progress < 1) {
          requestAnimationFrame(animate); // Continue animation until finished
        }
      }

      animate();
    }
  });

  pongContainer.addEventListener("mousemove", (e) => {
    playerPosY =
      e.clientY -
      pongContainer.getBoundingClientRect().top -
      playerPaddle.clientHeight / 2;

    if (playerPosY < 0) playerPosY = 0; // Keep paddle in bounds
    if (playerPosY > pongContainer.clientHeight - playerPaddle.clientHeight)
      playerPosY = pongContainer.clientHeight - playerPaddle.clientHeight;
  });

  // Start the game loop
  resetBall(); // Initial ball reset
  update(); // Start the update loop
})();
