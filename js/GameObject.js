import { AbstractClassException, AbstractMethodException } from "./exceptions.js";

export default class GameObject {
  #x;
  #y;

  constructor(x = 0, y = 0) {
    if (this.constructor === GameObject) {
      throw new AbstractClassException();
    }
    this.x = x;
    this.y = y;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = parseFloat(x) || this.#x || 0;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = parseFloat(y) || this.#y || 0;
  }

  draw(_ctx) {
    throw new AbstractMethodException();
  }
}
