import GameObject from "./GameObject.js";

export default class Ball extends GameObject {
  #xVel;
  #yVel;

  constructor(x = 0, y = 0, xVel = 0, yVel = 0) {
    super(x, y);
    this.xVel = xVel;
    this.yVel = yVel;
  }

  static get SPEED() {
    return 0.9;
  }

  get xVel() {
    return this.#xVel;
  }

  set xVel(xVel) {
    this.#xVel = parseFloat(xVel) || 0;
  }

  get yVel() {
    return this.#yVel;
  }

  set yVel(yVel) {
    this.#yVel = parseFloat(yVel) || 0;
  }

  get radius() {
    return 15;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}
