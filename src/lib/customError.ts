import { ErrorCode, errorMap } from "./errorExceptions";

class CustomError extends Error {
  public status: number;
  public errorCode: keyof typeof ErrorCode;

  constructor(errorCode: keyof typeof ErrorCode) {
    const errorConfig = errorMap[errorCode];
    super(errorConfig.message);
    // ensure that the prototype chain is correctly set up
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = errorConfig.status;
    this.errorCode = errorCode;
    this.name = this.constructor.name; // set the error name to the class name
  }
}

export default CustomError;
