import { keys } from "./handle-keydown";
import type { Player } from "./player";

export function handleKeyup({ key }: KeyboardEvent, player: Player) {
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
}
