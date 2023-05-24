export class RecipeError extends Error {
  constructor(message) {
    super(`Recipe Error: ${message}`);
  }
}
