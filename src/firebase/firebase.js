import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";

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
const database = getFirestore(app);

export { database };

export const getRegistrationDate = async () => {
  const registrationList = await getDocs(
    collection(database, "registration-info")
  );

  return registrationList.docs.map((doc) => doc.data()["registration-date"]);
};

export const getExpirationDate = async () => {
  const expirationDate = await getDocs(
    collection(database, "registration-info")
  );

  return expirationDate.docs.map((doc) => doc.data()["expiration-date"]);
};

// export const getRegistrationInfo = async () => {
//   const registrationList = await getDocs(
//     collection(database, "registration-info")
//   );

//   return registrationList.docs.map((doc) => {
//     //  const docRef = doc(database, doc.data()["car"]);
//     // const docSnap = await getDoc(docRef);

//     return {
//       center: doc.data()["center"],
//       "expiration-date": doc.data()["expiration-date"],
//       // car: doc.data()["car"],
//       car: await getDoc(doc.data()["car"]),
//       // car: getDoc(doc(database, doc.data()["car"])),
//     };
//   });
// };

export const getRegistrationInfo = async () => {
  // const registrationList = await getDocs(
  //   collection(database, "registration-info"),
  //   where("center", "==", "1101S")
  // );
  const registrationList = await getDocs(
    query(
      collection(database, "registration-info")
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

//construct listener in background
