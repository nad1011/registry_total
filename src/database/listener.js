import { dexieDB } from "./dexie";
import { database } from "./firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

const trackError = (error) => {
  console.log(error.message);
  console.trace(error.code);
};

export const setupListener = (collectionName, docName) => {
  const ref = collection(database, collectionName);
  const listener = onSnapshot(
    collection(database, collectionName),
    (snapshot) => {},
    (error) => trackError(error)
  );

  return listener;
};

const docListener = (colRef, docName) => {
  const listener = onSnapshot(
    doc(colRef, docName),
    (snapshot) => {},
    (error) => trackError(error)
  );

  return listener;
};
