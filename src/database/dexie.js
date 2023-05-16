import Dexie from "dexie";

const dexieDB = new Dexie("cachedData");
dexieDB.version(1).stores({
  center: "id",
  owner: "id, centerID",
  car: "vrm, centerID",
  certificate: "id, centerID",
});

export { dexieDB };

export const user = {
  _id: "",
  get id() {
    return this._id;
  },
  set id(email) {
    if (email === "") {
      this._id = "";
      return;
    }
    this._id = email.match(/.+(?=@)/)[0];
    if (/^center\d{4}[a-z]$/.test(email)) this._id = this._id.match(/(?<=center).+/);
  },
};
