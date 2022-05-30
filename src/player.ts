type XPosition = number;
type YPosition = number;
type Coords = { x: XPosition; y: YPosition };

export class Player {
  color: string;
  height: number;
  position: Coords;
  width: number;

  constructor() {
    this.color = "red";
    this.height = 30;
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 30;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
