import { Recipe } from "./Recipe.js";
import { DatabaseError } from "./errors/DatabaseError.js";
import { ObjectStoreError } from "./errors/ObjectStoreError.js";

export class RecipesDatabase {
  isStarted = false;

  /** @private */
  dbVersion = 2;

  /** @private */
  dbName = "recipes-db";

  /** @private */
  recipesObjectStoreName = "recipes";

  /**
   * @private
   * @type {IDBDatabase}
   */
  db;

  /** @return {Promise<RecipesDatabase>} */
  async start() {
    this.db = await this.connectToIndexedDB();

    this.setupDatabase();

    this.isStarted = true;

    return this;
  }

  /** @param recipe {Recipe} */
  async addRecipe(recipe) {
    const recipesStore = this.db
      .transaction([this.recipesObjectStoreName], "readwrite")
      .objectStore(this.recipesObjectStoreName);

    const request = recipesStore.add(recipe);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log(`Added recipe to database: ${recipe.name}`);
        resolve();
      };

      request.onerror = () => {
        console.log(`Could not add recipe to database: ${request.error}`);
        reject();
      };
    });
  }

  /** @returns {Promise<Recipe[]>} */
  async getAllRecipes() {
    return new Promise((resolve, reject) => {
      const recipesStore = this.db
        .transaction([this.recipesObjectStoreName], "readwrite")
        .objectStore(this.recipesObjectStoreName);

      const request = recipesStore.getAll();

      request.onsuccess = () => {
        resolve(request.result.map((res) => new Recipe(res)));
      };

      request.onerror = (e) => {
        reject(new ObjectStoreError(e.target.error));
      };
    });
  }

  /** @private */
  setupDatabase() {
    this.db.onerror = (e) => {
      console.error(new DatabaseError(e.target.error));
    };
  }

  /** @private @param db {IDBDatabase} */
  async setupObjectStore(db) {
    const objectStore = db.createObjectStore(this.recipesObjectStoreName, {
      keyPath: "id",
    });

    return new Promise((resolve, reject) => {
      objectStore.transaction.oncomplete = () => {
        resolve(db);
      };

      objectStore.transaction.onerror = (e) => {
        reject(new ObjectStoreError(e.target.error));
      };
    });
  }

  /**
   * @private
   * @returns {Promise<IDBDatabase>}
   */
  async connectToIndexedDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (e) => {
        reject(new DatabaseError(e.target.error));
      };

      request.onsuccess = (e) => {
        /** @type {IDBDatabase} */
        const db = e.target.result;

        resolve(db);
      };

      request.onupgradeneeded = (e) => {
        /** @type {IDBDatabase} */
        const db = e.target.result;

        this.setupObjectStore(db).then(() => {
          resolve(db);
        });
      };
    });
  }
}
