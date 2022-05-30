type XPosition = number;
type YPosition = number;
type XDir = -1 | 0 | 1;
type YDir = -1 | 0 | 1;
type Coords = { x: XPosition; y: YPosition };
interface Vector {
  x: XDir;
  y: YDir;
}

interface Velocity {
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
      y: 3,
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
  }
}
