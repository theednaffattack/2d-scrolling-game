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
const keys = {
  up: {
    pressed: false,
  },
  down: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

if (!context) {
  throw new Error("Context object is missing!");
}

player.draw(context);

function animate() {
  let frameRate = 0;
  if (!canvas) {
    throw new Error("Canvas element is missing!");
  }
  if (!context) {
    throw new Error("Context object is missing!");
  }
  requestAnimationFrame(animate);
  frameRate++;
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update(context);
  platform.draw(context);

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }
}

animate();

addEventListener("keydown", ({ key }: KeyboardEvent) => {
  const playerMovements = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "w",
    "a",
    "s",
    "d",
  ];
  const watchedKey = playerMovements.some((movement) => movement === key);
  if (watchedKey) {
    switch (key) {
      case "w":
        keys.up.pressed = true;
        player.velocity.y -= 15;
        break;
      case "a":
        keys.left.pressed = true;
        break;
      case "s":
        keys.down.pressed = true;
        break;
      case "d":
        keys.right.pressed = true;
        break;
      case "ArrowLeft":
        keys.left.pressed = true;
        break;
      case "ArrowRight":
        keys.right.pressed = true;
        break;
      case "ArrowUp":
        keys.up.pressed = true;
        player.velocity.y -= 15;
        break;
      case "ArrowDown":
        keys.down.pressed = true;
        break;

      default:
        console.error("This should be an impossible keydown state", key);
        break;
    }
  }
  // return "yeah";
});

addEventListener("keyup", ({ key }: KeyboardEvent) => {
  const playerMovements = [
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "w",
    "a",
    "s",
    "d",
  ];
  const watchedKey = playerMovements.some((movement) => movement === key);
  if (watchedKey) {
    switch (key) {
      case "w":
        keys.up.pressed = false;
        break;
      case "a":
        keys.left.pressed = false;
        break;
      case "s":
        keys.down.pressed = false;
        break;
      case "d":
        keys.right.pressed = false;
        break;
      case "ArrowLeft":
        keys.left.pressed = false;
        break;
      case "ArrowRight":
        keys.right.pressed = false;
        break;
      case "ArrowUp":
        keys.up.pressed = false;
        break;
      case "ArrowDown":
        keys.down.pressed = false;
        break;

      default:
        console.error("This should be an impossible keydown state", key);
        break;
    }
  }
  // return "yeah";
});
