import { Container, Row, FormControl, Button } from "react-bootstrap";
import { useState, useRef, useEffect, useContext } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import io from "socket.io-client";
import { AuthContext } from "../../firebase/Auth";

import Stats from "./Stats";
import Skills from "./Skills";
import Inventory from "./Inventory";
import Titles from "./Titles";
import Spells from "./Spells";
import Proficiencies from "./Proficiencies";
import Weapons from "./Weapons";
import { useParams } from "react-router-dom";

const axios = require("axios");

const placeholder = {
  id: "1",
  profileId: "sdfgdsa",
  dmId: "jdhkfdsjdkl",
  sessionId: "ajsdfghzdsl",
  inspiration: 3,
  name: "Jerry, Slayer of PCs",
  level: 17,
  race: "Kobold",
  class: "Cleric",
  alignment: "Lawful Good",
  background: "Acolyte",
  description:
    "Jerry was born as a pup, he was found by muriel, who lived in the middle of nowhere",
  inventory: "Map, Torch, a single gold coin",
  weapons: [
    {
      name: "Longsword",
      damage: "1d8",
      description: "A long sword",
    },
    {
      name: "Club",
      damage: "1d8",
      description: "A club, made of bubbles... Not very effective",
    },
  ],
  spells: [
    {
      name: "eldritch blast",
      description: "Blast your enemies warlock style",
      level: 0,
    },
    {
      name: "fireball",
      description: "Mr. Worldwide, Pitbull",
      level: 1,
    },
  ],
  spellSlots: {
    current: [2, 1, 0, 0, 0, 0, 0, 0, 0],
    max: [2, 3, 4, 5, 6, 0, 0, 0, 0],
  },
  stats: {
    strength: 20,
    dexterity: 21,
    constitution: 22,
    intelligence: 19,
    wisdom: 8,
    charisma: 17,
  },
  speed: 30,
  armorClass: 20,
  hitPoints: {
    current: 30,
    max: 30,
  },
  condition: "poisoned",
  inpiration: 4,
  proficiencies: {
    skill: ["Animal Handling", "Insight"],
    stat: ["dexterity"],
    armor: ["Heavy", "Light"],
    weapon: ["Martial", "Simple"],
    tool: ["Lockpick"],
    language: ["Commmon", "Infernal", "English"],
  },
};

function CharacterSheet() {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [char, setChar] = useState({});
  const [saved, setSaved] = useState(true);
  const [connected, setConnected] = useState(false);
  const { id } = useParams();
  const socketRef = useRef();

  //connect socket.io
  useEffect(() => {
    socketRef.current = io("/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // get char from db
  useEffect(() => {
    console.log("id useEffect fired");
    const getData = async () => {
      try {
        let response = await axios.get(`http://localhost:5000/character/${id}/${currentUser.uid}`);
        setChar(response.data);
        console.log(JSON.stringify(response.data, null, 4));
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    socketRef.current.on("Room_closed", () => {
      alert("The DM has not yet opened the session");
      setConnected(false);
    });
  }, []);

  function printDocument() {
    const input = document.getElementById("divToPrint");
    window.scrollTo(0, 0);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save("characterSheet.pdf");
    });
  }

  function joinSession() {
    socketRef.current.emit(
      "user_join",
      id,
      char.name,
      char.sessionId,
      char.hitPoints.current,
      char.hitPoints.max
    );
    setConnected(true);
  }

  function leaveSession() {
    socketRef.current.emit("user_left", char.sessionId, id);
    setConnected(false);
  }

  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };
  const handleSave = async () => {
    let response = await axios.put(`http://localhost:5000/character/${id}`, char);
    setSaved(true);
  };

  const saveButton = () => {
    if (saved) {
      return (
        <Button className="btn btn-success" size="lg" onClick={handleSave}>
          Save
        </Button>
      );
    }
    return (
      <Button className="btn btn-lg btn-danger " onClick={handleSave}>
        Save
      </Button>
    );
  };

  const connectionButton = () => {
    if (connected) {
      return (
        <Button onClick={leaveSession} className="btn btn-lg btn-primary mx-5">
          Leave Session
        </Button>
      );
    }
    return (
      <Button onClick={joinSession} className="btn btn-lg btn-primary mx-5">
        Join Session
      </Button>
    );
  };

  const handleLongRest = () => {
    const updatedChar = { ...char };
    updatedChar.hitPoints.current = updatedChar.hitPoints.max;
    updatedChar.spellSlots.current = updatedChar.spellSlots.max;

    console.log(updatedChar);
    setChar(updatedChar);
    setSaved(false);
  };

  const longRestButton = () => {
    if (connected) {
        return;
    }
    return (
      <Button className="btn btn-lg btn-primary mx-5" onClick={handleLongRest}>
        Long Rest
      </Button>
    );
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div id="divToPrint">
      <div className="d-block p-3 ">
        {longRestButton()}
        {saveButton()}
        <Button onClick={printDocument} className="btn btn-lg btn-primary mx-5">
          Print
        </Button>
        {connectionButton()}
      </div>
      <Container className="border border-3 border-secondary mx-auto p-3">
        <h4>Session ID:</h4>
        <h3 className="w-50 mx-auto" type="text">
          {char.sessionId}
        </h3>
        <Titles char={[char, setChar]} saved={[saved, setSaved]} />
        <Stats char={[char, setChar]} saved={[saved, setSaved]} socketRef={socketRef} lockdown={connected}/>
        <Proficiencies char={[char, setChar]} saved={[saved, setSaved]} />
        <Row>
          <Weapons char={[char, setChar]} saved={[saved, setSaved]}></Weapons>
          <Inventory char={[char, setChar]} saved={[saved, setSaved]} />
        </Row>

        <Row className="p-2">
          <Skills char={[char, setChar]} saved={[saved, setSaved]} />
          <Spells char={[char, setChar]} saved={[saved, setSaved]} />
        </Row>
      </Container>
    </div>
  );
}

export default CharacterSheet;
