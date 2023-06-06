import Dexie from "dexie";
import { fireDB } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const dexieDB = new Dexie("cachedData");
dexieDB.version(1).stores({
  owner: "id",
  car: "id",
  certificate: "id,center",
});

const user = {
  id: "hq",
  name: "",
  address: "",
  tel: "",
  email: "",
  loadData: (email) => {
    user.id = email.match(/(?<=center).+(?=@)/)?.[0].toUpperCase() ?? "";
    const loadProfile = async () => {
      const userDoc = await getDoc(doc(fireDB, "user", user.id));
      const data = userDoc.data();
      user.name = data.name;
      user.email = email;
      user.address = data.address;
      user.tel = data.tel;
    };
    loadProfile();
  },
  reset: () => {
    user.id = "";
    user.name = "";
    user.address = "";
    user.tel = "";
    user.email = "";
  },
};

const getDocID = (docRef) => docRef.path.split("/").pop();

export { dexieDB, user, getDocID };
