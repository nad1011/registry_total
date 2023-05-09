import { fireDB } from "./firebase";

import { collection, getDocs, query, getDoc } from "firebase/firestore";

export const getRegistrationDate = async () => {
  const registrationList = await getDocs(
    collection(fireDB, "registration-info")
  );

  return registrationList.docs.map((doc) => doc.data()["registration-date"]);
};

export const getExpirationDate = async () => {
  const expirationDate = await getDocs(
    collection(fireDB, "registration-info")
  );

  return expirationDate.docs.map((doc) => doc.data()["expiration-date"]);
};

export const getRegistrationInfo = async () => {
  const registrationList = await getDocs(
    query(collection(fireDB, "registration-info"))
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
