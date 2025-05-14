class BusinessError extends Error {
  statusCode: number;
  details: string[];

  constructor(message: string | string[], statusCode: number = 412) {
    if(Array.isArray(message)){
      super("Precondition Failed")
      this.details = message
    } else {
      super(message)
      this.details = []
    }

    this.statusCode = statusCode;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}

export default BusinessError;
