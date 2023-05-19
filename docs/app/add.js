import { FormValidationError } from "./FormValidationError";
import { Recipe } from "./Recipe";
import { createDatabaseConnection } from "./db";

const form = document.getElementById("add-recipe-form");

form.addEventListener("submit", handleAddRecipe);

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

  const db = await createDatabaseConnection();

  const recipesStore = db
    .transaction(["recipes"], "readwrite")
    .objectStore("recipes");

  const request = recipesStore.add(recipe);

  request.onsuccess = () => {
    console.log(`Added recipe to database: ${recipe.name}`);
    form.reset();
  };

  request.onerror = () => {
    console.log(`Could not add recipe to database: ${request.error}`);
    form.reset();
  };
}
