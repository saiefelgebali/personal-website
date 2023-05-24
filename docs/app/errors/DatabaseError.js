export class DatabaseError extends Error {
  constructor(message) {
    super(`Database error: ${message}`);
  }
}
