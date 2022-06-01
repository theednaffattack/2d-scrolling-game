import { GRAVITY } from "./constants";
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
  height: number;
  position: Coords;
  velocity: Velocity;
  width: number;

  constructor() {
    this.color = "red";
    this.height = 30;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 30;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context);
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (
      canvas &&
      this.position.y + this.height + this.velocity.y <= canvas.height
    ) {
      this.velocity.y += GRAVITY;
    } else {
      this.velocity.y = 0;
    }
  }
}
