import { AuthContext } from "../firebase/Auth";
import React, { useContext, useEffect, useState } from "react";
// import CharacterForm from "./CharacterForm";
import { Link } from "react-router-dom";
import SessionForm from "./SessionForm";
const axios = require("axios");

function SessionList() {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState(undefined);
  const [upToDate, setUpToDate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(`http://localhost:5000/session/sessions/${currentUser.uid}`);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser && !upToDate) {
      getData();
      setUpToDate(true);
    }
  }, [currentUser, upToDate]);
  if (currentUser) {
  }
  let page;

  if (!currentUser) {
    page = <p> Please login to view your Sessions</p>;
  } else if (data) {
    page = (
      <div>
        <br />
        <SessionForm update={setUpToDate} />
        <br />
        <br />
        {data.map((session) => (
          <div key={`${session._id}`}>
            <Link to={`/session/${session._id}`} title={session.sessionName}>
              {session.sessionName}
            </Link>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return page;
}

export default SessionList;
