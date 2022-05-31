import { Coords } from "./player";

interface PlatformProps {
  x: number;
  y: number;
}

export class Platform {
  height: number;
  position: Coords;
  width: number;

  constructor({ x, y }: PlatformProps) {
    this.height = 20;
    this.position = {
      x,
      y,
    };
    this.width = 200;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
