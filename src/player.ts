import { GRAVITY } from "./constants";
import {
  spriteRunLeft,
  spriteRunRight,
  spriteStandLeft,
  spriteStandRight,
} from "./images";
import { canvas } from "./main";

type XPosition = number;
type YPosition = number;
type XDir = -1 | 0 | 1;
type YDir = -1 | 0 | 1;
export type Coords = { x: XPosition; y: YPosition };
interface Vector {
  x: XDir;
  y: YDir;
}

interface SpriteProperties {
  left: HTMLImageElement;
  right: HTMLImageElement;
  cropWidth: number;
  width: number;
}

interface SpriteActions {
  stand: SpriteProperties;
  run: SpriteProperties;
}
export interface Velocity {
  x: number;
  y: number;
}

export class Player {
  color: string;
  currentCropWidth: number;
  currentSprite: HTMLImageElement;
  frames: number;
  height: number;
  image: HTMLImageElement;
  position: Coords;
  speed: number;
  sprites: SpriteActions;
  velocity: Velocity;
  width: number;

  constructor() {
    this.color = "red";
    this.sprites = {
      stand: {
        left: spriteStandLeft,
        right: spriteStandRight,
        cropWidth: 177,
        width: 66,
      },
      run: {
        left: spriteRunLeft,
        right: spriteRunRight,
        cropWidth: 340,
        width: 127.875,
      },
    };
    this.currentCropWidth = this.sprites.stand.cropWidth;
    this.currentSprite = this.sprites.stand.right;
    this.frames = 0;
    this.height = 150;
    this.image = spriteStandRight;
    this.position = {
      x: 100,
      y: 100,
    };
    this.speed = 10;

    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 66;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.currentSprite,
      // image width times the current frame
      // will keep us on the right sprite sequence
      // image, by changing the crop start point
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(context: CanvasRenderingContext2D) {
    this.frames++;
    if (this.frames > 28) {
      this.frames = 0;
    }
    this.draw(context);
    // Use velocity to move the player
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (
      canvas &&
      this.position.y + this.height + this.velocity.y <=
        canvas.height + this.height
    ) {
      this.velocity.y += GRAVITY;
    } else {
      // Set velocity to one if the player falls off
      // the canvas
      this.velocity.y = 1;
    }
  }
}
