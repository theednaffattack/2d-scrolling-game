import { GRAVITY } from "./constants";
import { spriteStandRight } from "./images";
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

export interface Velocity {
  x: number;
  y: number;
}

export class Player {
  color: string;
  frames: number;
  height: number;
  image: HTMLImageElement;
  position: Coords;
  speed: number;
  velocity: Velocity;
  width: number;

  constructor() {
    this.color = "red";
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
      this.image,
      0,
      0,
      177,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update(context: CanvasRenderingContext2D) {
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
