import { GenericEntity } from "./generic-entity";

import { Platform } from "./platform";
import { Player } from "./player";

import {
  platformSmallTall,
  backgroundImage,
  hillImage,
  platformImage,
} from "./images";

interface InitProps {
  // backgroundImage: HTMLImageElement;
  context: CanvasRenderingContext2D;
  // genericEntities: GenericEntity[];
  // hillImage: HTMLImageElement;
  // platforms: Platform[];
  // platformImage: HTMLImageElement;
  // player: Player;
  // scrollOffset: number;
}

export function init({ context }: InitProps) {
  let player = new Player();

  let platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTall.width,
      y: 270,
      image: platformSmallTall,
    }),
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 470,
      image: platformImage,
    }),
  ];

  let genericEntities = [
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

  let scrollOffset = 0;
  return {
    backgroundImage,
    context,
    genericEntities,
    hillImage,
    platforms,
    platformImage,
    player,
    scrollOffset,
  };
}
