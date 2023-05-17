import Dexie from "dexie";

const dexieDB = new Dexie("cachedData");
dexieDB.version(1).stores({
  center: "id",
  owner: "id",
  car: "id",
  certificate: "id, centerID",
});

export { dexieDB };

export const user = {
  get id() {
    return this._id;
  },
  set id(email) {
    this._id = email.match(/.+(?=@)/)?.[0];
    if (/^center\d{4}[a-z]$/.test(this._id))
      this._id = this._id.match(/(?<=center).+/)[0].toUpperCase();
  },
};
