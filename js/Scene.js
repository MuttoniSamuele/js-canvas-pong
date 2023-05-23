import GameObject from "./GameObject.js";

export default class Scene {
  #canvas;
  #ctx;
  #gameObjects;

  constructor(canvas = null) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
    }
    this.#canvas = canvas;
    this.#ctx = canvas.getContext("2d");
    this.#gameObjects = [];
  }

  get canvas() {
    return this.#canvas;
  }

  get gameObjects() {
    return [...this.#gameObjects];
  }

  addGameObject(gameObject) {
    if (!(gameObject instanceof GameObject) || this.#gameObjects.includes(gameObject)) {
      return false;
    }
    this.#gameObjects.push(gameObject);
    return true;
  }

  removeGameObject(gameObject) {
    const index = this.#gameObjects.indexOf(gameObject);
    if (index === -1) {
      return false;
    }
    this.#gameObjects.splice(index, 1);
    return true;
  }

  draw() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    for (const obj of this.#gameObjects) {
      obj.draw(this.#ctx);
    }
  }
}
