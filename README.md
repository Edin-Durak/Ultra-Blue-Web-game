# Ping Pong Game - Shopify Integration

This repository contains the code for a **Ping Pong game** built with **HTML, CSS, and JavaScript**. The game was originally developed based on a Figma design and optimized for integration into a **Shopify store**.

You can view the live version of the game on the Shopify store here: [getultrablu.com](https://getultrablu.com/)

## Features

- **Responsive Design**: The game is optimized for all screen sizes, ensuring a smooth experience on both desktop and mobile devices.
- **Custom Paddles & Ball**: Custom images are used for the paddles and ball to match the client's branding.
- **Touch Controls**: Players can interact with the game by tapping the screen to move the paddle.
- **SEO-Optimized**: Images are loaded lazily to improve performance, and the game structure is optimized for accessibility.

## Technology Stack

- **HTML**: Markup for the game layout.
- **CSS**: Styling, including responsiveness.
- **JavaScript**: Game logic for ball movement, paddle control, and collision detection.
- **Bootstrap**: External Bootstrap stylesheet for basic layout and responsiveness (loaded via the Shopify CDN).

## How It Works

The game is a classic Ping Pong game where the player controls the left paddle. The ball moves automatically, and the player can tap the screen to move their paddle and hit the ball.

### File Structure

- `index.html`: Contains the main structure of the game.
- `CSS/styles.css`: Defines the styles for the game, such as paddles, ball, text, and positioning.
- `JavaScript/pong.js`: Implements the game logic, including paddle movements and ball dynamics.
- **Image Assets**: Custom paddles and ball images are included in the `Image/` folder.

### HTML Structure

The game HTML consists of the following elements:

- **Player's Paddle**: Controlled by the player, represented by an image (`ultrablue-1.png`).
- **Opponent's Paddle**: The right-side paddle, controlled automatically, represented by an image (`ultrablue-2.png`).
- **Ball**: The object that bounces between paddles, represented by an image (`virus-image.png`).
- **Text Elements**: For branding and interaction instructions.

### Padding Containers

The `<div class="padding-container"></div>` elements serve as placeholders and represent spacing used in the Shopify store layout. These divs ensure that the game is displayed between two sections on the store’s landing page.

## How to Use

To run the game locally:

1. Clone the repository.
2. Ensure that you have the correct file structure:
    - `index.html`
    - `CSS/styles.css`
    - `JavaScript/pong.js`
    - `Image/` folder with the custom images.
3. Open `index.html` in your browser to play the game locally.

## Credits

- **Figma Design**: Provided by the client.
- **Integration**: The game was successfully integrated into the Shopify store using custom sections and liquid files.

## License

This project is licensed under the MIT License.
