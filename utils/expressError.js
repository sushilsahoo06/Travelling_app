class ExpressError extends Error {
  constructor(statusCode, message) { // Corrected 'message'
    super(message); // Call the parent constructor with the correct 'message'
    this.statusCode = statusCode;
    this.message=message;
  }
}

module.exports = ExpressError;
