import firebase from 'firebase/app'
//import '@firebase/firestore'
import firebaseConfig from './firebaseConfig'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp(firebaseConfig)
export default getFirestore(firebaseApp)