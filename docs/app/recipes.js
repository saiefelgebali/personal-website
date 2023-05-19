import { Recipe } from "./Recipe";

/** @type {Recipe[]} */
const recipes = [
  {
    name: "Tiramisu",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tiramisu_-_Raffaele_Diomede.jpg/800px-Tiramisu_-_Raffaele_Diomede.jpg",
  },
  {
    name: "Sticky Toffee Pudding",
    image:
      "https://tornadoughalli.com/wp-content/uploads/2022/09/STICKY-TOFFEE-PUDDING-RECIPE-2-1.jpg",
  },
  {
    name: "Victoria Sponge",
    image:
      "https://thelittleglutenfreebakingblog.com/wp-content/uploads/2022/05/image_editor_output_image1472385169-1653916712938.jpg",
  },
];

function populateRecipes() {
  const container = document.getElementById("recipes-container");

  recipes.forEach((recipe) => {
    const element = document.createElement("div");
    element.className = "recipe";
    element.innerHTML = `
    <h2 class="name">${recipe.name}</h2>
    <img class="image" src="${recipe.image}" />
    `;
    container.appendChild(element);
  });
}

populateRecipes();
