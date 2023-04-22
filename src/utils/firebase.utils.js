// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD3Yt7Hg7CFKbNhJvzRHlh4isr2qj4gAko",
//   authDomain: "registry-total-db.firebaseapp.com",
//   projectId: "registry-total-db",
//   storageBucket: "registry-total-db.appspot.com",
//   messagingSenderId: "4272824435",
//   appId: "1:4272824435:web:c2360c24ab88048bffca06",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const googleProvider = new GoogleAuthProvider();

// googleProvider.setCustomParameters({
//   prompt: "select_account",
// });

// export const auth = getAuth();

// export const db = getFirestore(app);

// export const signInWithGooglePopup = () =>
//   signInWithPopup(auth, googleProvider);

// export const createUserDocumentFromAuth = async (userAuth) => {
//   const userDocRef = doc(db, "users", userAuth.uid);

//   console.log(userDocRef);

//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createAt = new Date();
//     alert(`Da tao tai khoan luc ${createAt}`);
//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createAt,
//       });
//     } catch (error) {
//       console.log("error creating the user", error.message);
//     }
//   }
//   return userDocRef;
// };
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

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
    // console.log(doc.id, " => ", doc.data()["expiration-date"]);
  });
  // console.log(list);
  return list;
};
export { database };
