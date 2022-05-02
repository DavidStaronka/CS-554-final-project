import firebase from 'firebase/app';

async function callCreateUserWithEmailAndPassword(email, password, displayName) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}



export {
  callCreateUserWithEmailAndPassword,

};