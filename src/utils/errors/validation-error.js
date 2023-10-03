const status = require("http-status");

class ValidationError extends Error {
  constructor(error) {
    super("Not able to validate the request");
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });
    this.name = error.name;
    this.message="Not able to validate the request";
    this.explanation = explanation;
    this.statusCode = status.BAD_REQUEST;
  }
}

module.exports = ValidationError;
