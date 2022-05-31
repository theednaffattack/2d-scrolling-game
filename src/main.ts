import { animate } from "./animate";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { Platform } from "./platform";
import { Player } from "./player";

export const canvas = document.querySelector("canvas");

if (!canvas) {
  throw new Error("Canvas object is missing!");
}

canvas.width = innerWidth;
canvas.height = innerHeight;
export const context = canvas?.getContext("2d");

export const player = new Player();
export const platforms = [
  new Platform({ x: 200, y: 100 }),
  new Platform({ x: 500, y: 300 }),
];

if (!context) {
  throw new Error("Context object is missing!");
}

player.draw(context);

animate({ canvas, context, player, platforms });

addEventListener("keydown", (evt) => handleKeydown(evt, player));

addEventListener("keyup", (evt) => handleKeyup(evt, player));
