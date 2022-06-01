import { EntityProps } from "./platform";
import type { Coords } from "./player";

export class GenericEntity {
  height: number;
  position: Coords;
  width: number;
  image: HTMLImageElement;

  constructor({ x, y, image }: EntityProps) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.height = image.height;
    this.width = image.width;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.position.x, this.position.y);
    // context.fillStyle = "blue";
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
