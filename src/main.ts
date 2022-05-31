import { handleKeydown, keys } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { Platform } from "./platform";
import { Player } from "./player";

export const canvas = document.querySelector("canvas");

if (!canvas) {
  throw new Error("Canvas object is missing!");
}

canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas?.getContext("2d");

const player = new Player();
const platform = new Platform();

if (!context) {
  throw new Error("Context object is missing!");
}

player.draw(context);

function animate() {
  if (!canvas) {
    throw new Error("Canvas element is missing!");
  }
  if (!context) {
    throw new Error("Context object is missing!");
  }
  requestAnimationFrame(animate);

  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update(context);
  platform.draw(context);

  // Move player left and right
  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }

  // Stop players on top of platforms (collision detection)

  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x + player.width <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  }
}

animate();

addEventListener("keydown", (evt) => handleKeydown(evt, player));

addEventListener("keyup", (evt) => handleKeyup(evt, player));
