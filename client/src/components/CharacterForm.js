import { AuthContext } from "../firebase/Auth";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";

const axios = require("axios");
function CharacterForm(props) {
  const { currentUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);
  const setUpToDate = props.update;

  let body;

  const handleCreateCharacter = async (e) => {
    e.preventDefault();

    const { name, session } = e.target.elements;

    if (!name.value.trim()) {
      alert("Character Name must be provided");
      return;
    }
    if (!session.value.trim()) {
      alert("Session Name must be provided");
      return;
    }

    //TODO CHECK SESSION EXISTS
    console.log(name.value, session.value);
    try {
      let response = await axios.post(`http://localhost:5000/character`, {
        name: name.value,
        session: session.value,
        userId: currentUser.uid,
      });
      if (response.data.message) {
        throw response.data.message;
      }
      console.log(JSON.stringify(response, null, 4));
      setUpToDate(false);
      setCollapsed(true);
    } catch (error) {
      console.log(JSON.stringify(error, null, 4));
      alert(error);
    }
  };

  if (collapsed) {
    body = (
      <Button
        onClick={() => {
          setCollapsed(false);
        }}
      >
        Add Character
      </Button>
    );
  } else {
    body = (
      <form onSubmit={handleCreateCharacter}>
        <div className="form-group">
          <label>
            Character Name:
            <input className="form-control" required name="name" placeholder="Name" />
          </label>
        </div>
        <br />
        <div className="form-group">
          <label>
            Session Name:
            <input className="form-control" required name="session" placeholder="Session" />
          </label>
        </div>
        <br></br>
        <Button type="submit">Create Character</Button>
      </form>
    );
  }

  return body;
}

export default CharacterForm;
