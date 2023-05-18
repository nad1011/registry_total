import { database } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const setupListener = (collectionName, onNext) =>
  onSnapshot(collection(database, collectionName), onNext, (error) => {
    alert(error.name);
    console.trace(error.message);
  });
