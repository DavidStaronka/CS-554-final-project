import firebase from 'firebase/app';

async function callCreateUserWithEmailAndPassword(email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function callSignOut() {
  await firebase.auth().signOut();
}



export {
  callCreateUserWithEmailAndPassword,
  callSignOut
};