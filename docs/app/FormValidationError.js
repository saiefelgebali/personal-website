export class FormValidationError extends Error {
  /** @param {string} message */
  constructor(message) {
    super(`Form Validation Error: ${message}`);
  }
}
