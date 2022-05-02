import firebase from 'firebase/app';

async function callCreateUserWithEmailAndPassword(email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function callSignOut() {
  await firebase.auth().signOut();
}

async function callSignInWithEmailAndPassword(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function callPasswordReset(email) {
  await firebase.auth().sendPasswordResetEmail(email);
}


export {
  callCreateUserWithEmailAndPassword,
  callSignOut,
  callSignInWithEmailAndPassword,
  callPasswordReset
};