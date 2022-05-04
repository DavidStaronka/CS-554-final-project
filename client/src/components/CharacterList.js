import { AuthContext } from "../firebase/Auth";
import React, { useContext } from "react";
import CharacterForm from "./CharacterForm";
const axios = require("axios");

function CharacterList() {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    console.log(currentUser.uid);
  }
  let page;

  if (!currentUser) {
    page = <p> Please login to view your Characters</p>;
  } else {
    page = (
      <div>
        <p>Characters Page</p>
        <CharacterForm />
      </div>
    );
  }

  return page;
}

export default CharacterList;
