import { fireDB } from "./firebase";
import { collection, doc, writeBatch } from "@firebase/firestore";
import { faker } from "@faker-js/faker";

const batch = writeBatch(fireDB);

batch.commit();
