import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
