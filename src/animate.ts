import background from "../assets/background.png";
import hills from "../assets/hills.png";
import platformImage from "../assets/platform.png";
import { GenericEntity } from "./generic-entity";
import { lastKey, keys } from "./handle-keydown";
import { newImage } from "./new-image";
import type { Platform } from "./platform";
import { Player } from "./player";
import { reset } from "./reset";

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
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    // Move the platform and generic entities right
    //  at the current player speed
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });

      // Scroll the generic entities slower
      // to create parallax effect.
      genericEntities.forEach((entity) => {
        entity.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });

      genericEntities.forEach((entity) => {
        entity.position.x += player.speed * 0.66;
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

  // Check for standing state transition to running
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    // If the left key is not being pressed but the
    // last key pressed WAS left...
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  } else if (
    // If the left key is not being pressed but the
    // last key pressed WAS left...
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  const lastPlatform = platforms[platforms.length - 1];

  // Win scenario
  if (scrollOffset >= lastPlatform.width * 5 + 300 - 2) {
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
