export class AbstractClassException extends Error {
  constructor(msg = "Cannot instantiate abstract class") {
    super(msg);
    this.name = this.constructor.name;
  }
}

export class AbstractMethodException extends Error {
  constructor(msg = "Cannot call abstract method") {
    super(msg);
    this.name = this.constructor.name;
  }
}
