import { FormValidationError } from "../errors/FormValidationError.js";
// eslint-disable-next-line no-unused-vars
import { Recipe } from "../Recipe.js";
import { RecipesDatabase } from "../db.js";
import { RecipeData } from "../RecipeData.js";

const db = new RecipesDatabase();

async function main() {
  try {
    await db.start();
  } catch (e) {
    console.error(e);
  }

  const form = document.getElementById("add-recipe-form");
  form.addEventListener("submit", handleAddRecipe);

  const imageInput = document.getElementById("image-input");
  imageInput.addEventListener("change", handleImagePreviewChange);
}

/** @param {SubmitEvent & { currentTarget: HTMLFormElement }} e */
async function handleAddRecipe(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const name = formData.get("name");

  if (typeof name !== "string") {
    throw new FormValidationError("name is not a string");
  }

  /** @type {File} */
  const imageFile = formData.get("image");
  if (!(imageFile instanceof File)) {
    throw new FormValidationError("imageFile is not a File object");
  }

  const recipe = RecipeData(name, imageFile);

  try {
    await db.addRecipe(recipe);
  } catch (e) {
    console.log(e.message);
    return;
  }
}

/** @param {Event & { currentTarget: HTMLInputElement }} e */
function handleImagePreviewChange(e) {
  const imagePreview = document.getElementById("image-preview");

  const [file] = e.currentTarget.files;
  if (!file) {
    imagePreview.src = "";
    return;
  }

  imagePreview.src = URL.createObjectURL(file);
}

void main();
