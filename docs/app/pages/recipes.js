// eslint-disable-next-line no-unused-vars
import { Recipe } from "../Recipe.js";
import { RecipeData } from "../RecipeData.js";
import { RecipesDatabase } from "../db.js";

const recipes = [
  new RecipeData(
    "123",
    "Tiramisu",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tiramisu_-_Raffaele_Diomede.jpg/800px-Tiramisu_-_Raffaele_Diomede.jpg"
  ),
  new RecipeData(
    "456",
    "Sticky Toffee Pudding",
    "https://tornadoughalli.com/wp-content/uploads/2022/09/STICKY-TOFFEE-PUDDING-RECIPE-2-1.jpg"
  ),
  new RecipeData(
    "789",
    "Victoria Sponge",
    "https://thelittleglutenfreebakingblog.com/wp-content/uploads/2022/05/image_editor_output_image1472385169-1653916712938.jpg"
  ),
];

/**
 * @param {Recipe} recipe
 * @param {HTMLElement} container
 */
function appendRecipeToContainer(recipe, container) {
  const element = document.createElement("div");
  element.className = "recipe";
  try {
    element.innerHTML = `
      <h2 class="name">${recipe.name}</h2>
      <img class="image" src="${recipe.getImageUrl()}" />
      `;
  } catch (e) {
    console.log(e);
  }
  container.appendChild(element);
}

async function populateRecipes() {
  const container = document.getElementById("recipes-container");

  const db = await new RecipesDatabase().start();

  await db.start();

  const allRecipes = [
    ...recipes.map((data) => new Recipe(data)),
    ...(await db.getAllRecipes()),
  ];

  allRecipes.forEach((recipe) => appendRecipeToContainer(recipe, container));
}

populateRecipes();
