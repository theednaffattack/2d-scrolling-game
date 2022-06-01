import { Coords } from "./player";

interface PlatformProps {
  x: number;
  y: number;
  image: HTMLImageElement;
}

export class Platform {
  height: number;
  position: Coords;
  width: number;
  image: HTMLImageElement;

  constructor({ x, y, image }: PlatformProps) {
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
