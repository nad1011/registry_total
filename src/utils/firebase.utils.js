import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  getDoc,
  DocumentReference,
  doc,
  docs,
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

export const getRegistrationDate = async () => {
  const querySnapshot = await getDocs(
    collection(database, "registration-info")
  );
  const list = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data()["registration-date"]);
  });
  return list;
};

// export const getOwnerInfo = async () => {
//   const querySnapshot = await getDocs(collection(database, "owner-info"));
//   const list = [];
//   querySnapshot.forEach((doc) => {
//     // list.push(doc.data()["cars"]);
//     list.push(doc.data().cars);
//   });
//   return list;
// };

export const getOwnerInfo = async () => {
  // const userDocRef = doc(database, "owner-info", "009200263045");
  const userDocRef = doc(database, "/owner-info/030383960107");
  // const userDocRef = doc(database, "car-info", "11D273447");
  const querySnapshot = await getDoc(userDocRef);
  // console.log("userDocRef", userDocRef);
  return querySnapshot.data();

  // const querySnapshot = await getDocs(collection(database, "owner-info"));
  // const list = [];
  // querySnapshot.forEach((doc) => {
  //   // list.push(doc.data()["cars"]);
  //   list.push(doc.data().cars);
  // });
  // return userDocRef;
};
// export const getOwnerInfo = async (clubDocRef) => {
//   const clubSnapshot = await getDoc(clubDocRef);
//   return clubSnapshot.data();
// };

export { database };
