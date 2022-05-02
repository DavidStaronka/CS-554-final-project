import { AuthContext } from '../firebase/Auth';
import React, { useContext } from 'react';
const axios = require("axios");

function CharacterList() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  if (!currentUser){
    return <p> Please login to view your Characters</p>
  } else {
    return <p>Characters Page</p>;
  }
}

export default CharacterList;
