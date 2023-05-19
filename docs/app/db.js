const dbVersion = 2;

/** @returns {Promise<IDBDatabase>} */
export async function createDatabaseConnection() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("recipes-db", dbVersion);

    request.onerror = (e) => {
      console.log(`Could not access IndexedDB. Error Code: ${e.target.error}`);
      reject();
    };

    request.onsuccess = (e) => {
      console.log("Success creating/accessing IndexedDB database");

      /** @type {IDBDatabase} */
      const db = e.target.result;

      resolve(db);

      db.onerror = (e) => {
        console.log(`Database error: ${e.target.errorCode}`);
        reject();
      };
    };

    request.onupgradeneeded = (e) => {
      /** @type {IDBDatabase} */
      const db = e.target.result;

      const objectStore = db.createObjectStore("recipes", { keyPath: "id" });

      objectStore.transaction.oncomplete = (e) => {
        resolve(db);
      };
    };
  });
}
