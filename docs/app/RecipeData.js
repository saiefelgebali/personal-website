export class RecipeData {
  /**
   * @type {string}
   */
  id;

  /**
   * @type {string}
   */
  name;

  /**
   * @type {Blob | string}
   */
  image;

  /**
   *
   * @param {string} id
   * @param {string} name
   * @param {string | Blob} image
   */
  constructor(id = crypto.randomUUID(), name, image) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
