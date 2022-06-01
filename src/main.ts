import hills from "../assets/hills.png";
import platform from "../assets/platform.png";
import background from "../assets/background.png";
import { animate } from "./animate";
import { GenericEntity } from "./generic-entity";
import { handleKeydown } from "./handle-keydown";
import { handleKeyup } from "./handle-keyup";
import { newImage } from "./new-image";
import { Platform } from "./platform";
import { Player } from "./player";

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

const platformImage = newImage(platform);

const hillImage = newImage(hills);

const backgroundImage = newImage(background);

export const platforms = [
  new Platform({ x: -1, y: 470, image: platformImage }),
  new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
];

const genericEntities = [
  new GenericEntity({
    x: -1,
    y: -1,
    image: backgroundImage,
  }),
  new GenericEntity({ x: 800, y: -1, image: hillImage }),

  new GenericEntity({
    x: -1,
    y: -1,
    image: hillImage,
  }),
];

if (!context) {
  throw new Error("Context object is missing!");
}

player.draw(context);

let scrollOffset = 0;

animate({ canvas, context, genericEntities, player, platforms, scrollOffset });

addEventListener("keydown", (evt) => handleKeydown(evt, player));

addEventListener("keyup", (evt) => handleKeyup(evt, player));
