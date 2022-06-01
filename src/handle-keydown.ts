import type { Player } from "./player";

export const keys = {
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

export function handleKeydown({ key }: KeyboardEvent, player: Player) {
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
        player.velocity.y -= 10;
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
        player.velocity.y -= 10;
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
}
