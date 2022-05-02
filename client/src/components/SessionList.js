import { AuthContext } from '../firebase/Auth';
import React, { useContext } from 'react';
const axios = require("axios");

function SessionList() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  if (!currentUser){
    return <p> Please login to view your Sessions</p>
  } else {
    return <p>Sessions Page</p>;
  }
}

export default SessionList;
