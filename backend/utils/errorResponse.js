class ErrorResponse extends Error {
    constructor(message, codeStatus) {
      super(message); // to initialize the inherited property of parent class
      this.codeStatus = codeStatus;
    }
  }
  
  module.exports = ErrorResponse;
