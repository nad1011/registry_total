import { database } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const setupListener = (collectionName, dexieTable) => {
  const listener = onSnapshot(
    collection(database, collectionName),
    (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const data = { id: change.doc.id, data: change.doc.data() };
        switch (change.type) {
          case "added":
          case "modified":
            await dexieTable.put(data);
            break;
          case "removed":
            await dexieTable.delete(data.id);
            break;
        }
      });
    },
    (error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.stack);
    }
  );

  return listener;
};
