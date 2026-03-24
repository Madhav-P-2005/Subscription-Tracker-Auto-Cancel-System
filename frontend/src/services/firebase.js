import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCU6UfJwxWffY6EZOj5GQf9cTJqYTapodY",
  authDomain: "subscription-tracker-99283.firebaseapp.com",
  projectId: "subscription-tracker-99283",
  storageBucket: "subscription-tracker-99283.firebasestorage.app",
  messagingSenderId: "179075550989",
  appId: "1:179075550989:web:3207e25339bf1319766a44",
  measurementId: "G-Z19WWZCD6Q"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Helper to save analyzed subscriptions to Firestore
export const saveSubscriptionsToFirebase = async (subscriptions) => {
  try {
    const batchPromises = subscriptions.map(sub => 
      setDoc(doc(db, 'subscriptions', sub.id), sub)
    );
    await Promise.all(batchPromises);
    console.log("Subscriptions saved to Firebase");
  } catch (error) {
    console.error("Error saving subscriptions:", error);
  }
};

export const getSubscriptionsFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'subscriptions'));
    const subs = [];
    querySnapshot.forEach((doc) => {
      subs.push({ id: doc.id, ...doc.data() });
    });
    return subs;
  } catch (error) {
    console.error("Error getting subscriptions:", error);
    return [];
  }
};

// Transactions saving
export const saveTransactionsToFirebase = async (transactions) => {
  try {
    // Only saving first 20 as an example to prevent large dumps
    const txToSave = transactions.slice(0, 20);
    const batchPromises = txToSave.map(tx => 
       addDoc(collection(db, 'transactions'), tx)
    );
    await Promise.all(batchPromises);
    console.log("Sample Transactions saved to Firebase");
  } catch (error) {
    console.error("Error saving transactions:", error);
  }
};

// We will export a functional mock Firebase Cancel if needed, 
// but our UI uses `cancelSubscription` from api.js directly for the backend.
export const updateSubscriptionInFirebase = async (id, data) => {
  try {
    const subRef = doc(db, 'subscriptions', id);
    await updateDoc(subRef, data);
  } catch (error) {
    console.error("Error updating subscription:", error);
  }
};
