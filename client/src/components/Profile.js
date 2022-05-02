import { AuthContext } from '../firebase/Auth';
import React, { useContext } from 'react';
const axios = require("axios");

function Profile() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  if (!currentUser){
    return <p> Please login to view your profile</p>
  } else {
    return <p>Profile Page</p>;
  }
}

export default Profile;
