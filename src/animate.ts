import { GenericEntity } from "./generic-entity";
import { keys } from "./handle-keydown";
import { reset } from "./reset";
import { newImage } from "./new-image";
import type { Platform } from "./platform";
import { Player } from "./player";
import background from "../assets/background.png";
import hills from "../assets/hills.png";
import platformImage from "../assets/platform.png";

interface AnimateProps {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  genericEntities: GenericEntity[];
  player: Player;
  platforms: Platform[];
  scrollOffset: number;
}

export function animate({
  canvas,
  context,
  genericEntities,
  player,
  platforms,
  scrollOffset,
}: AnimateProps) {
  if (!canvas) {
    throw new Error("Canvas element is missing!");
  }
  if (!context) {
    throw new Error("Context object is missing!");
  }
  requestAnimationFrame(() =>
    animate({
      canvas,
      context,
      genericEntities,
      player,
      platforms,
      scrollOffset,
    })
  );

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  genericEntities.forEach((entity) => {
    entity.draw(context);
  });

  platforms.forEach((platform) => {
    platform.draw(context);
  });

  player.update(context);
  // Move player left and right
  // But stop moving at 400 pixels
  if (keys.right.pressed && player.position.x <= 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    // Move the platform and generic entities right
    //  at the current player speed
    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });

      // Scroll the generic entities slower
      // to create parallax effect.
      genericEntities.forEach((entity) => {
        entity.position.x -= 3;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });

      genericEntities.forEach((entity) => {
        entity.position.x += 3;
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

  // Win scenario
  if (scrollOffset >= 2000) {
    console.log("YOU WIN");
  }

  // Lose scenario
  if (player.position.y > canvas.height) {
    reset({
      backgroundImage: newImage(background),
      context,
      genericEntities,
      hillImage: newImage(hills),
      platformImage: newImage(platformImage),
      platforms,
      player,
      scrollOffset,
    });
  }
}
