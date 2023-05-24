export class ObjectStoreError extends Error {
  constructor(message) {
    super(`Could not access object store: ${message}`);
  }
}
