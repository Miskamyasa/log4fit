// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeApp} from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  QueryConstraint,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCRQxMExKaZ6__xf_1CeeYFu5T8Z0O4yzM",
  authDomain: "log4fit.firebaseapp.com",
  projectId: "log4fit",
  storageBucket: "log4fit.appspot.com",
  messagingSenderId: "2532081372",
  appId: "1:2532081372:web:94244f3a171a3f32e63e19",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const createDocRef = (path: string, ...pathSegments: string[])
  : DocumentReference => doc(firestore, path, ...pathSegments);

export const createCollectionRef = (path: string)
  : CollectionReference => collection(firestore, path);

export const refs = Object.freeze({
  exercises: createCollectionRef("exercises"),
  workouts: createCollectionRef("workouts"),
  approaches: createCollectionRef("approaches"),
  customExercises: createCollectionRef("custom"),
});

export async function createDocument(collectionRef: CollectionReference, data: Record<string, unknown>)
  :Promise<DocumentReference<Record<string, unknown>> | undefined> {
  try {
    const docRef = await addDoc(collectionRef, data);
    if (docRef.id) {
      return docRef;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}

export async function getDocSnapshot(ref: DocumentReference): Promise<QueryDocumentSnapshot | undefined> {
  try {
    const docSnapshot = await getDoc(ref);
    if (docSnapshot.exists()) {
      return docSnapshot;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}

export async function getCollectionSnapshot(ref: CollectionReference, constraint: QueryConstraint[] = [])
  : Promise<QuerySnapshot | null> {
  try {
    const q = query(ref, ...constraint);
    if (q) {
      const collectionSnapshot = await getDocs(q);
      if (collectionSnapshot) {
        return collectionSnapshot;
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
  return null;
}
