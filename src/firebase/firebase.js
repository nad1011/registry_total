import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import Dexie from "dexie";

const firebaseConfig = {
  apiKey: "AIzaSyCserEAADxBpBDkNWDig-mQGRXOuyx_-hg",
  authDomain: "registry-total.firebaseapp.com",
  projectId: "registry-total",
  storageBucket: "registry-total.appspot.com",
  messagingSenderId: "733448954659",
  appId: "1:733448954659:web:2e47198e7c5f6a81ed2296",
  measurementId: "G-XCV4J0ZWGM",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

const dexieDB = new Dexie("cached-data");
dexieDB.version(1).stores({
  registration: "id",
});

export { fireDB, dexieDB };

//move later
export const getRegistrationDate = async () => {
  const registrationList = await getDocs(
    collection(fireDB, "registration-info")
  );

  return registrationList.docs.map((doc) => doc.data()["registration-date"]);
};

export const getExpirationDate = async () => {
  const expirationDate = await getDocs(collection(fireDB, "registration-info"));

  return expirationDate.docs.map((doc) => doc.data()["expiration-date"]);
};

export const getRegistrationInfo = async () => {
  const registrationList = await getDocs(
    query(
      collection(fireDB, "registration-info")
      // where("center", "==", "6104D")
    )
  );

  let id = 1;
  return Promise.all(
    registrationList.docs.map(async (doc) => {
      const carDocRef = doc.data().car;
      const carDoc = await getDoc(carDocRef);
      const ownerDoc = await getDoc(carDoc.data().owner);
      const result = {
        id,
        center: doc.data().center,
        "registration-date": doc.data()["registration-date"],
        numberPlate: carDoc.id,
        owner: ownerDoc.data()["name"],
      };
      id++;
      return result;
    })
  );
};
