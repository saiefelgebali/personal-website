// eslint-disable-next-line no-unused-vars
import { RecipeData } from "./RecipeData.js";
import { RecipeError } from "./errors/RecipeError.js";

export class Recipe {
  /**
   * @readonly
   * @type {string}
   */
  id;

  /**
   * @readonly
   * @type {string}
   */
  name;

  /**
   * @readonly
   * @type {string | Blob}
   */
  image;

  /**
   * @param {RecipeData} data
   */
  static fromDatabase(data) {
    return new Recipe(data.id).setName(data.name).setImage(data.image);
  }

  /**
   *
   * @param {string} id
   * @param {string | undefined} name
   * @param {string | Blob | undefined} image
   */
  constructor(id = crypto.randomUUID(), name, image) {
    this.id = id;
    if (name) this.name = name;
    if (image) this.image = image;
  }

  /** @param {string} name */
  setName = (name) => {
    this.name = name;
    return this;
  };

  /** @param {string | Blob} image */
  setImage = (image) => {
    this.image = image;
    return this;
  };

  getImageUrl() {
    if (this.image instanceof Blob) {
      return URL.createObjectURL(this.image);
    } else if (typeof this.image === "string") {
      return this.image;
    } else {
      throw new RecipeError("Could not get image URL");
    }
  }
}
