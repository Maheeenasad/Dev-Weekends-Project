// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAX1QfziwRgn4x2KIoMh5NBCYctpYVoiE",
  authDomain: "pantry-pro-f1fa5.firebaseapp.com",
  projectId: "pantry-pro-f1fa5",
  storageBucket: "pantry-pro-f1fa5.appspot.com",
  messagingSenderId: "222010835282",
  appId: "1:222010835282:web:0771c65d589dfd82a57a8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Fetch upcoming events from Firestore
export async function fetchUpcomingEvents() {
  try {
    const eventsRef = collection(db, "events");
    const snapshot = await getDocs(eventsRef);
    const events = snapshot.docs.map((doc) => doc.data());
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
// Fetch mentors by a specific skill from Firestore
export async function fetchMentorsBySkills(skill) {
  try {
    const mentorsRef = collection(db, "mentors");
    const q = query(mentorsRef, where("skills", "array-contains", skill));
    const snapshot = await getDocs(q);
    const mentors = snapshot.docs.map((doc) => doc.data());
    return mentors;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
}
