// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeApp} from "firebase/app";
import {initializeFirestore, getFirestore, collection, getDocs} from "firebase/firestore";


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

async function getCollection<T>(path: string): Promise<T[] | undefined> {
  const res: T[] = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, path));
    querySnapshot.forEach((doc) => {
      res.push(doc.data() as T);
    });
  } catch (e) {
    console.error(e);
  }
  return res;
}

export {getCollection};
