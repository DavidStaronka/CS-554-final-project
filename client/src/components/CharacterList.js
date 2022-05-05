import { AuthContext } from "../firebase/Auth";
import React, { useContext, useEffect, useState } from "react";
import CharacterForm from "./CharacterForm";
import { Link } from "react-router-dom";
const axios = require("axios");

function CharacterList() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(undefined);
  const [upToDate, setUpToDate] = useState(false);

  const getData = async () => {
    let response = await axios.get(`http://localhost:5000/character/characters/${currentUser.uid}`);
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    if (currentUser && !upToDate) {
      getData();
      setUpToDate(true);
    }
  }, [currentUser, upToDate]);
  if (currentUser) {
  }
  let page;

  if (!currentUser) {
    page = <p> Please login to view your Characters</p>;
  } else if (data) {
    page = (
      <div>
        <br />
        <CharacterForm update={setUpToDate} />
        <br />
        <br />
        {data.map((character) => (
          <div>
            <Link to={`/character/${character._id}`} title={character.name}>
              {character.name}
            </Link>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return page;
}

export default CharacterList;
