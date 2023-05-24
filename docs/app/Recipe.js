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
   *
   * @param {RecipeData} data
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
  }

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
