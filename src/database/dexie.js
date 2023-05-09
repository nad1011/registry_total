import Dexie from "dexie";

const dexieDB = new Dexie("cachedData");
dexieDB.version(1).stores({
  center: "id",
  certificate: "id",
});

export { dexieDB };
