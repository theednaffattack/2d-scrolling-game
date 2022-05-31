import { keys } from "./handle-keydown";
import type { Platform } from "./platform";
import type { Player } from "./player";

interface AnimateProps {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  player: Player;
  platforms: Platform[];
}

export function animate({ canvas, context, player, platforms }: AnimateProps) {
  if (!canvas) {
    throw new Error("Canvas element is missing!");
  }
  if (!context) {
    throw new Error("Context object is missing!");
  }
  requestAnimationFrame(() => animate({ canvas, context, player, platforms }));

  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update(context);

  platforms.forEach((platform) => {
    platform.draw(context);
  });

  // Move player left and right
  // But stop moving at 400 pixels
  if (keys.right.pressed && player.position.x <= 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    // Move the platform right at the current player speed
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }
  platforms.forEach((platform) => {
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
  });
}