import { Coords } from "./player";

export class Platform {
  height: number;
  position: Coords;
  width: number;

  constructor() {
    this.height = 20;
    this.position = {
      x: 200,
      y: 100,
    };
    this.width = 200;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
