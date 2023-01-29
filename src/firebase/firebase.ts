// https://firebase.google.com/docs/web/setup#available-libraries
import {getAnalytics} from "firebase/analytics"
import {initializeApp} from "firebase/app"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getFirestore,
  collection,
  getDocs,
  query,
  Query,
  QueryConstraint,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore"

import ErrorHandler from "../helpers/ErrorHandler"


const firebaseConfig = {
  apiKey: "AIzaSyD43rJwNUQIQYZphGDwRk2HSh6jYWj5NJY",
  authDomain: "log4fit-miskamyasa.firebaseapp.com",
  projectId: "log4fit-miskamyasa",
  storageBucket: "log4fit-miskamyasa.appspot.com",
  messagingSenderId: "1073108062447",
  appId: "1:1073108062447:web:c8fd6987fa13371c258b1a",
  measurementId: "G-2RPJYRK25W",
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

// const firestore = getFirestore(app)

// export const createDocRef = (path: string, ...pathSegments: string[]): DocumentReference => doc(firestore, path, ...pathSegments)

// export const createCollectionRef = (path: string): CollectionReference => collection(firestore, path)

// export const refs = Object.freeze({
//   exercises: createCollectionRef("exercises"),
//   workouts: createCollectionRef("workouts"),
//   approaches: createCollectionRef("approaches"),
//   customExercises: createCollectionRef("custom"),
// })

// export async function createDocument(collectionRef: CollectionReference, data: Record<string, unknown>): Promise<DocumentReference | undefined> {
//   try {
//     const docRef = await addDoc(collectionRef, data)
//     if (docRef.id) {
//       return docRef
//     }
//   } catch (e) {
//     ErrorHandler(e)
//   }
// }

// export async function getDocSnapshot(ref: DocumentReference): Promise<QueryDocumentSnapshot | undefined> {
//   try {
//     const docSnapshot = await getDoc(ref)
//     if (docSnapshot.exists()) {
//       return docSnapshot
//     }
//   } catch (e) {
//     ErrorHandler(e)
//   }
// }

// export async function getCollectionSnapshot(ref: Query, constraint: QueryConstraint[] = []): Promise<QuerySnapshot | undefined> {
//   try {
//     const q = query(ref, ...constraint)
//     if (q) {
//       const collectionSnapshot = await getDocs(q)
//       if (collectionSnapshot) {
//         return collectionSnapshot
//       }
//     }
//   } catch (e) {
//     ErrorHandler(e)
//   }
// }
