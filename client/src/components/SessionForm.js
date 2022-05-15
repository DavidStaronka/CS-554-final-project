import { AuthContext } from "../firebase/Auth";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";

const axios = require("axios");
function SessionForm(props) {
  const { currentUser } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(true);
  const setUpToDate = props.update;

  let body;

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { session } = e.target.elements;

    if (!session.value.trim()) {
      alert("Session Name must be provided");
      return;
    }

    //TODO CHECK SESSION EXISTS
    console.log(session.value);
    try {
      let response = await axios.post(`http://localhost:5000/session`, {
        sessionName: session.value,
        userId: currentUser.uid,
      });
      setUpToDate(false);
      setCollapsed(true);
    } catch (error) {
      alert(JSON.stringify(error.response.data.error));
    }
  };

  if (collapsed) {
    body = (
      <Button
        onClick={() => {
          setCollapsed(false);
        }}
      >
        Add Session
      </Button>
    );
  } else {
    body = (
      <form onSubmit={handleCreateSession}>
        <div className="form-group">
          <label>
            Session Name:
            <input className="form-control" required name="session" placeholder="Session" />
          </label>
        </div>
        <br></br>
        <Button type="submit">Create Session</Button>
      </form>
    );
  }

  return body;
}

export default SessionForm;
