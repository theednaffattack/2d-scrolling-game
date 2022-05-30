import { Player } from "./player";

export const canvas = document.querySelector("canvas");

if (!canvas) {
  throw new Error("Canvas object is missing!");
}

canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas?.getContext("2d");

const player = new Player();

if (!context) {
  throw new Error("Context object is missing!");
}
const drawnPlayer = player.draw(context);
