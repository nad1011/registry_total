import serviceAcc from "./registry-total-firebase-admin.json" assert { type: "json" };
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const app = initializeApp({
  credential: cert(serviceAcc),
});
const auth = getAuth(app);
const firestore = getFirestore(app);
