export class FormValidationError extends Error {
  constructor(message) {
    super(`Form Validation Error: ${message}`);
  }
}
