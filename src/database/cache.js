import Dexie from "dexie";
import { fireDB } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const dexieDB = new Dexie("cachedData");
dexieDB.version(1).stores({
  certificate: "id,center",
});

const loadUserState = (email) => {
  if (
    localStorage.getItem("id") &&
    localStorage.getItem("email") &&
    localStorage.getItem("name") &&
    localStorage.getItem("address") &&
    localStorage.getItem("tel")
  )
    return;

  localStorage.setItem("email", email);
  localStorage.setItem("id", email.match(/(?<=center).+(?=@)/)?.[0].toUpperCase() ?? "hq");
  const loadProfile = async () => {
    const userDoc = await getDoc(doc(fireDB, "user", localStorage.getItem("id")));
    const data = userDoc.data();
    localStorage.setItem("name", data.name);
    localStorage.setItem("address", data.address);
    localStorage.setItem("tel", data.tel);
  };
  loadProfile();
};

const clearUserState = () => {
  ["id", "name", "address", "tel", "email"].forEach((key) => localStorage.setItem(key, ""));
};

const getDocID = (docRef) => docRef.path.split("/").pop();

export { dexieDB, loadUserState, clearUserState, getDocID };
