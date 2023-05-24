import { FormValidationError } from "./FormValidationError.js";
// eslint-disable-next-line no-unused-vars
import { Recipe } from "./Recipe.js";
import { RecipesDatabase } from "./db.js";

const form = document.getElementById("add-recipe-form");
const db = new RecipesDatabase();

async function main() {
  try {
    await db.start();
  } catch (e) {
    console.error(e);
  }

  form.addEventListener("submit", handleAddRecipe);
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

  /** @type {Recipe} */
  const recipe = {
    id: crypto.randomUUID(),
    name: name,
    image: imageFile,
  };

  try {
    await db.addRecipe(recipe);
  } catch (e) {
    console.log(e.message);
    return;
  }
}

void main();
