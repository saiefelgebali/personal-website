import { RecipeData } from "../../RecipeData.js";
import { RecipesDatabase } from "../../db.js";
import { FormValidationError } from "../../errors/FormValidationError.js";
import { InfoBanner } from "./InfoBanner.js";
import { ImageInput } from "./imageInput.js";

export class AddRecipeForm {
  db = new RecipesDatabase();

  /** @param {HTMLFormElement} form */
  constructor(form) {
    this.form = form;
    this.imageInput = new ImageInput(
      this.form.querySelector(".image-input-container")
    );
    this.infoBanner = new InfoBanner(this.form.querySelector(".info-banner"));
    void this.start();
  }

  start = async () => {
    await this.db.start();
    this.form.addEventListener("submit", this.handleSubmit);
  };

  /** @param {SubmitEvent & { currentTarget: HTMLFormElement }} e */
  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await this.db.addRecipe(this.createRecipe(formData));
      this.resetForm();
      this.infoBanner.setText("Recipe added successfully");
    } catch (e) {
      if (e instanceof FormValidationError) {
        console.log(e.message);
      } else {
        console.error(e);
      }
      this.infoBanner.setError(e);
    }
  };

  resetForm = () => {
    this.form.reset();
    this.imageInput.clearImagePreview();
  };

  /** @param {FormData} formData */
  createRecipe = (formData) => {
    const name = formData.get("name");

    if (typeof name !== "string") {
      throw new FormValidationError("name is not a string");
    }

    const imageFile = formData.get("image");
    if (!(imageFile instanceof File)) {
      throw new FormValidationError("imageFile is not a File object");
    }

    return new RecipeData(crypto.randomUUID(), name, imageFile);
  };
}
