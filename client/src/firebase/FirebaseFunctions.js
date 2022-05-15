// import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

import { auth } from "./Firebase";


async function callCreateUserWithEmailAndPassword(email, password) {
  await createUserWithEmailAndPassword(auth,email, password);
}

async function callSignOut() {
  await signOut(auth);
}

async function callSignInWithEmailAndPassword(email, password) {
  await signInWithEmailAndPassword(auth,email, password);
}

// async function callPasswordReset(email) {
//   await sendPasswordResetEmail(auth,email);
// }

export {
  callCreateUserWithEmailAndPassword,
  callSignOut,
  callSignInWithEmailAndPassword,
  // callPasswordReset,
};