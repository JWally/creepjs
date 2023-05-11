import EZCrypto from "../utils/ezwebcrypto.mjs";
import EZindexDB from "../utils/ezindexdb.mjs";

class MockEZindexDB {
  #data = {};
  #database;

  async start(database, table, indexes) {
    this.#database = database;

    if (!this.#data[database]) {
      this.#data[database] = {};
    }
    if (!this.#data[database][table]) {
      this.#data[database][table] = { records: {}, indexes: {} };
    }
    if (indexes) {
      indexes.forEach((index) => {
        this.#data[database][table].indexes[index] = {};
      });
    }
    return true;
  }

  async creates(table, record) {
    const databaseTable = this.#data[this.#database][table];
    if (databaseTable[record.id]) {
      throw new Error("Record already exists");
    }
    databaseTable[record.id] = record;
    return record.id;
  }

  async reads( table, id) {
    return this.#data[this.#database][table][id] || null;
  }

  async updates(table, updatedRecord) {
    const databaseTable = this.#data[this.#database][table];
    databaseTable[updatedRecord.id] = { ...databaseTable[updatedRecord.id], ...updatedRecord };
    return updatedRecord.id;
  }

  async deletes(table, id) {
    const databaseTable = this.#data[this.#database][table];
    if (!databaseTable[id]) {
      throw new Error("Record not found");
    }
    delete databaseTable.records[id];
    return id;
  }

  async searches(table, field, value) {
    const databaseTable = this.#data[this.#database][table];
    return Object.values(databaseTable.records).filter((record) => record[field] === value);
  }
}
const imdb = new MockEZindexDB();





/**
 * Retrieves or creates key data and returns it along with a signature.
 * If the key data does not exist in the IndexedDB, it creates new signature keys,
 * signs the public key, and stores the keys and metadata in the IndexedDB.
 *
 * @async
 * @function
 * @returns {Promise<Object>} A Promise that resolves with the key data and signature.
 */
const crypto_cookie = async () => {

  // Initialize EZCrypto and EZindexDB instances
  const ezcrypto = new EZCrypto();
  let idb = new EZindexDB();

  // Start the IndexedDB with the specified object store and index
  try {
    await idb.start("_ix", "_iy");
  } catch (e) {
    // Pseudo the indexdb
    idb = new MockEZindexDB();
    await idb.start("_ix", "_iy");
  }

  // Retrieve or create key data
  let key_data = await idb.reads("_iy", "_iz");
  if (!key_data) {
    // Create signature keys if key_data doesn't exist
    let keys = await ezcrypto.EcMakeSigKeys(false);

    await idb.creates("_iy", { id: "_iz", ...keys });

    // Retrieve key_data from the IndexedDB
    key_data = await idb.reads("_iy", "_iz");
  }

  let returnData = {
    id: key_data.id,
    publicKey: key_data.publicKey,
    timestamp: new Date().getTime(),
  };

  // Include metadata if it exists
  if (key_data.metadata) {
    returnData.metadata = key_data.metadata;
  }

  // Base64 encode the JSON stringified returnData
  let target = btoa(JSON.stringify(returnData));
  let signature = await ezcrypto.EcSignData(key_data.privateKey, target);

  let cryptoCookieProof = btoa(JSON.stringify({ target, signature }));

  let cryptoCookie = key_data.publicKey;

  return {cryptoCookie, cryptoCookieProof};
};


// Export the get_key_data and update_key_data functions
export { crypto_cookie };
