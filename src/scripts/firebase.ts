import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { auth as firebaseUiAuth } from "firebaseui";

import { firebaseConfig } from "@/config/project";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const advisorsCollectionRef = db.collection("advisors");
export const conversationsCollectionRef = db.collection("conversations");

export const auth = firebase.auth();
export const authObject = firebase.auth;

export const ui = new firebaseUiAuth.AuthUI(auth);
