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
  where,
  query,
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

//============================================================================//

// const licenseData = new Set();
// const registrationIdData = new Set();
// const series = [
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "K",
//   "L",
//   "M",
//   "N",
//   "P",
//   "S",
//   "T",
//   "U",
//   "V",
//   "X",
//   "Y",
//   "Z",
// ];

// const licenseGenerator = () => {
//   let regionCode = parseInt(Math.random() * 89 + 11);
//   let serialCode =
//     series[parseInt(Math.random() * 20)] + parseInt(Math.random() * 9 + 1);
//   let registrationNumber = `0000${Math.random() * 99999 + 1}`.slice(-5);
//   return `${regionCode}${serialCode}${registrationNumber}`;
// };

// const registrationIdGenerator = () => {
//   return `KC-${`000000${Math.random() * 9999999 + 1}`.slice(-7)}`;
// };

// let start = new Date("2015-01-01");
// let end = new Date("2020-01-01");
// const dateGenerator = () => {
//   const date = new Date(
//     Math.random() * (end.getTime() - start.getTime()) + start.getTime()
//   );
//   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
// };
// const endDateGenerator = (startDate) => {
//   const durationArr = [0.5, 1, 1.5, 2.5];
//   const duration = durationArr[parseInt(Math.random() * 4)];
//   const date = new Date(new Date(startDate).getTime() + duration * 31556952000);
//   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
// };

// const owners = await getDocs(collection(database, "owner-info"));
// owners.forEach(async (owner) => {
//   let carsOwned = parseInt(Math.random() * 3 + 1);
//   while (carsOwned-- > 0) {
//     let licensePalate;
//     do {
//       licensePalate = licenseGenerator();
//     } while (licenseData.has(licensePalate));

//     const carDoc = doc(database, "car-info", licensePalate);
//     await setDoc(carDoc, {
//       owner: owner.ref,
//     });

//     await updateDoc(owner.ref, {
//       cars: arrayUnion(carDoc),
//     });

//     let registrationID;
//     do {
//       registrationID = registrationIdGenerator();
//     } while (registrationIdData.has(registrationID));

//     await setDoc(doc(database, "registration-info", registrationID), {
//       "registration-date": registrationDate,
//       "expiration-date": expirationDate,
//       car: carDoc,
//     });
//   }
// });

// const center = [
//   "1101S",
//   "1102D",
//   "1201D",
//   "1202D",
//   "1501V",
//   "1502S",
//   "1503D",
//   "1504D",
//   "1505D",
//   "1701D",
//   "1702D",
//   "1801S",
//   "1802S",
//   "1802D",
//   "1803D",
//   "1901V",
//   "1902D",
//   "1904D",
//   "1905D",
//   "2001S",
//   "2002S",
//   "2003D",
//   "2004D",
//   "2005D",
//   "2006D",
//   "2007D",
//   "2101S",
//   "2102D",
//   "2201S",
//   "2202D",
//   "2301S",
//   "2401D",
//   "2501S",
//   "2602D",
//   "2601D",
//   "2603D",
//   "2701S",
//   "2801S",
//   "2901S",
//   "2901V",
//   "2902S",
//   "2902V",
//   "2903S",
//   "2903V",
//   "2904V",
//   "2905V",
//   "2906V",
//   "2907D",
//   "2908D",
//   "2909D",
//   "2910D",
//   "2911D",
//   "2912D",
//   "2913D",
//   "2914D",
//   "2915D",
//   "2916D",
//   "2917D",
//   "2918D",
//   "2921D",
//   "2922D",
//   "2923D",
//   "2927D",
//   "2929D",
//   "2930D",
//   "3301S",
//   "3302S",
//   "3401D",
//   "3402D",
//   "3403D",
//   "3404D",
//   "3405D",
//   "9701D",
//   "9801S",
//   "9802D",
//   "9803D",
//   "9804D",
//   "9805D",
//   "9805D",
//   "9901S",
//   "9902S",
//   "9903D",
//   "9904D",
//   "9905D",
//   "3501D",
//   "3502D",
//   "3503D",
//   "3601S",
//   "3602S",
//   "3603D",
//   "3604D",
//   "3605D",
//   "3606D",
//   "3608D",
//   "36009",
//   "3701S",
//   "3702S",
//   "3703D",
//   "3704D",
//   "3705D",
//   "3706D",
//   "3708D",
//   "3709D",
//   "8801S",
//   "8802D",
//   "8803D",
//   "8804D",
//   "8901S",
//   "8902S",
//   "8904D",
//   "8905D",
//   "8906D",
//   "9001S",
//   "9201D",
//   "9202D",
//   "3801D",
//   "3802D",
//   "3803D",
//   "3804D",
//   "3805D",
//   "7301S",
//   "7302D",
//   "7303D",
//   "7501S",
//   "7502S",
//   "7601S",
//   "7602D",
//   "7603D",
//   "7604D",
//   "7701S",
//   "7702S",
//   "7704D",
//   "7801S",
//   "7802D",
//   "7803D",
//   "7901S",
//   "7902S",
//   "8102D",
//   "8103D",
//   "8104D",
//   "8105D",
//   "8201S",
//   "4301S",
//   "4302S",
//   "4304D",
//   "4701D",
//   "4702D",
//   "4703D",
//   "4704D",
//   "4705D",
//   "8501S",
//   "8601S",
//   "8602D",
//   "4801D",
//   "4901S",
//   "4902S",
//   "4903S",
//   "5001S",
//   "5002S",
//   "5003S",
//   "5003V",
//   "5004V",
//   "5005V",
//   "5006V",
//   "5007V",
//   "5008D",
//   "5009D",
//   "5010D",
//   "5012D",
//   "5013D",
//   "5014D",
//   "5015D",
//   "5017D",
//   "5019D",
//   "6001S",
//   "6002S",
//   "6003S",
//   "6004D",
//   "6005D",
//   "6006D",
//   "7201S",
//   "7202D",
//   "7203D",
//   "7204S",
//   "6101S",
//   "6102S",
//   "6103S",
//   "6103D",
//   "6104D",
//   "6105D",
//   "6106D",
//   "6109D",
//   "6110D",
//   "9301S",
//   "9302D",
//   "9303D",
//   "7001S",
//   "7002S",
//   "7003D",
//   "6201S",
//   "6202D",
//   "6203D",
//   "6301S",
//   "6302D",
//   "6303D",
//   "6401V",
//   "6502D",
//   "6503D",
//   "6504D",
//   "6601S",
//   "7101S",
//   "7102D",
//   "8301V",
//   "8302D",
//   "8401V",
//   "9401V",
//   "6701S",
//   "6702S",
//   "6703D",
//   "6801S",
//   "6901V",
//   "9501S",
//   "9502D",
// ];

// const registrationInfo = await getDocs(
//   collection(database, "registration-info")
// );
// registrationInfo.forEach(async (info) => {
//   await updateDoc(info.ref, {
//     center: center[parseInt(Math.random() * center.length)],
//   });
// });
