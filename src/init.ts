import { GenericEntity } from "./generic-entity";
import { newImage } from "./new-image";
import { Platform } from "./platform";
import { Player } from "./player";
import hills from "../assets/hills.png";
import platform from "../assets/platform.png";
import background from "../assets/background.png";

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

  const platformImage = newImage(platform);

  const hillImage = newImage(hills);

  const backgroundImage = newImage(background);

  let platforms = [
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 100,
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
