import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth, storage } from "./Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


async function callCreateUserWithEmailAndPassword(email, password) {
  await createUserWithEmailAndPassword(auth,email, password);
}

async function callSignOut() {
  await signOut(auth);
}

async function callSignInWithEmailAndPassword(email, password) {
  await signInWithEmailAndPassword(auth,email, password);
}

async function callPasswordReset(email) {
  await sendPasswordResetEmail(auth,email);
}

async function callProfileUpload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}


export {
  callCreateUserWithEmailAndPassword,
  callSignOut,
  callSignInWithEmailAndPassword,
  callPasswordReset,
  callProfileUpload
};