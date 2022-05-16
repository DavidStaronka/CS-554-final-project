import { AuthContext } from "../firebase/Auth";
import React, { useContext, useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

function Session(props) {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const socketRef = useRef();
  const [session, setSession] = useState(undefined);
  const [chars, setChars] = useState([]);
  const [sessionOpen, setSessionOpen] = useState(false);
  console.log(props);

  //connect socket.io
  useEffect(() => {
    socketRef.current = io("/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //get session data
  useEffect(() => {
    const getSession = async () => {
      try {
        let response = await axios.get(`http://localhost:5000/session/${id}/${currentUser.uid}`);
        setSession(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentUser) {
      getSession();
    }
  }, [currentUser, id]);

  const DM_join = () => {
    setSessionOpen(true);
    socketRef.current.emit("DM_join", session.sessionName);
  };

  const healthChange = (health, charId) => {
    socketRef.current.emit("healthChange", health, session.sessionName, charId);
  };

  useEffect(() => {
    socketRef.current.on("user_join", ({ charId, charName, health, max_health }) => {
      console.log(`User Join \n Params: ${charId}`);
      let newChar = { charId: charId, charName: charName, health: health, max_health: max_health };
      setChars([...chars, newChar]);
      console.log(JSON.stringify(newChar, null, 4));
      console.log(JSON.stringify(chars[0], null, 4));
    });

    socketRef.current.on("user_left", ({ charId }) => {
      console.log(`front end recived user_left \n Name: ${charId}`);
      let newChars = [...chars];
      let i = chars.findIndex((elem) => elem.charId === charId);
      console.log(`User that is leaving: ${JSON.stringify(chars[i], null, 4)}`);
      newChars.splice(i, 1);
      setChars(newChars);
      console.log(`Users: ${chars}`);
    });
  }, [chars]);

  const room_close = () => {
    socketRef.current.emit("room_close", session.sessionName);
    setSessionOpen(false);
  };

  console.log(sessionOpen);
  if (!session) {
    return <div>Loading...</div>;
  }
  if (!sessionOpen) {
    return (
      <div>
        <h1>{session.sessionName}</h1>
        <Button onClick={DM_join}>Open Session</Button>
      </div>
    );
  }
  return (
    <div>
      <h1>{session.sessionName}</h1>
        <Button onClick={room_close}>Close Session</Button>
      <div>
        {chars.map((char) => (
          <div key={`${char.charId}`}>
            <h3>{char.charName}</h3>
            <h3>{`Max Health: ${char.max_health}`}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target.health.value);
                healthChange(e.target.health.value, char.charId);
              }}
            >
              <input type="number" name="health" defaultValue={char.health} />
              <Button type="submit">Change Health</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Session;
