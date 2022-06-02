import { animate } from "./animate";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { init } from "./init";

export const canvas = document.querySelector("canvas");
if (!canvas) {
  throw new Error("Canvas object is missing!");
}

const config = {
  canvas: { width: 1024, height: 576 },
};

canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
export const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Context object is missing!");
}

const {
  context: initContext,
  genericEntities,
  platforms,
  player,
  scrollOffset,
} = init({ context });

player.draw(initContext);

animate({
  canvas,
  context: initContext,
  genericEntities,
  player,
  platforms,
  scrollOffset,
});

addEventListener("keydown", (evt) => handleKeydown(evt, player));

addEventListener("keyup", (evt) => handleKeyup(evt, player));
