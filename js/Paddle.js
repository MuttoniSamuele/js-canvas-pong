import GameObject from "./GameObject.js";
import Ball from "./Ball.js";

export default class Paddle extends GameObject {
  constructor(x = 0, y = 0) {
    super(x, y);
  }

  static get EDGE_OFFSET() {
    return 40;
  }

  static get SPEED() {
    return 0.55;
  }

  get width() {
    return 20;
  }

  get height() {
    return 100;
  }

  isBallTouchingSide(ball, isRightSide = true) {
    if (!(ball instanceof Ball)) {
      return false;
    }
    return (
      (ball.y - ball.radius >= this.y - this.height / 2) &&
      (ball.y + ball.radius <= this.y + this.height / 2) &&
      (isRightSide
        ? (ball.x - ball.radius <= this.x + this.width / 2)
        : (ball.x + ball.radius >= this.x - this.width / 2))
    );
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.closePath();
  }
}
