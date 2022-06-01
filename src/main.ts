import { animate } from "./animate";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { Platform } from "./platform";
import { Player } from "./player";
import platform from "../assets/platform.png";

export const canvas = document.querySelector("canvas");
if (!canvas) {
  throw new Error("Canvas object is missing!");
}

const config = {
  canvas: { width: 1024, height: 576 },
};

canvas.width = config.canvas.width;
canvas.height = config.canvas.height;
export const context = canvas?.getContext("2d");

export const player = new Player();

const myImage = new Image();
myImage.src = platform;

export const platforms = [
  new Platform({ x: -1, y: 470, image: myImage }),
  new Platform({ x: myImage.width - 3, y: 470, image: myImage }),
];

if (!context) {
  throw new Error("Context object is missing!");
}

player.draw(context);

let scrollOffset = 0;

animate({ canvas, context, player, platforms, scrollOffset });

addEventListener("keydown", (evt) => handleKeydown(evt, player));

addEventListener("keyup", (evt) => handleKeyup(evt, player));
