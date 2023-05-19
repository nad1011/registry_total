import Dexie from "dexie";

const dexieDB = new Dexie("cachedData");
dexieDB.version(1).stores({
  owner: "id",
  car: "id",
  certificate: "id,center",
});

export { dexieDB };

export const user = {
  id: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  loadData: ({ email, displayName }) => {
    user.id = email.match(/.+(?=@)/)?.[0] ?? "";
    user.id = user.id.match(/(?<=center).+/)?.[0].toUpperCase() ?? user.id;
    [user.name, user.address, user.phone] = displayName.split("|");
    user.email = email;
  },
  reset: () => {
    user.id = "";
    user.name = "";
    user.address = "";
    user.phone = "";
    user.email = "";
  },
};
