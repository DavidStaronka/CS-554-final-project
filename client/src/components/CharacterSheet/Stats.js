import { Col, Row, FormControl } from "react-bootstrap";

function Stats(props) {
  const [char, setChar] = props.char;
  const setSaved = props.saved[1];
  const socketRef = props.socketRef;

  const handleStatChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar.stats[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const handleHitPointsChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar.hitPoints[stat] = val;
    if (stat === "current") {
      socketRef.current.emit("healthChange", val, char.sessionId, char.id);
    }
    setChar(updatedChar);
    setSaved(false);
  };

  return (
    <div>
      <Row className="p-2">
        <Col className=" border-primary m-1">
          <h6>Strength</h6>
          <strong>
            {(Math.floor((char.stats.strength - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.strength - 10) / 2)}
          </strong>
          <br />
          <FormControl
            type="number"
            value={char.stats.strength}
            onChange={(e) => handleStatChange("strength", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
        <Col className="border-primary m-1">
          <h6>Dexterity</h6>
          <strong>
            {(Math.floor((char.stats.dexterity - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.dexterity - 10) / 2)}
          </strong>
          <br />
          <FormControl
            type="number"
            value={char.stats.dexterity}
            onChange={(e) => handleStatChange("dexterity", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
        <Col className="border-primary m-1">
          <h6>Constitution</h6>
          <strong>
            {(Math.floor((char.stats.constitution - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.constitution - 10) / 2)}
          </strong>
          <br />
          <FormControl
            type="number"
            value={char.stats.constitution}
            onChange={(e) => handleStatChange("constitution", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
        <Col className="border-primary m-1">
          <h6>Intelligence</h6>
          <strong>
            {(Math.floor((char.stats.intelligence - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.intelligence - 10) / 2)}
          </strong>
          <br />
          <FormControl
            type="number"
            value={char.stats.intelligence}
            onChange={(e) => handleStatChange("intelligence", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
        <Col className="border-primary m-1">
          <h6>Wisdom</h6>
          <strong>
            {(Math.floor((char.stats.wisdom - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.wisdom - 10) / 2)}
          </strong>
          <br />
          <FormControl
            type="number"
            value={char.stats.wisdom}
            onChange={(e) => handleStatChange("wisdom", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
        <Col className="border-primary m-1">
          <h6>Charisma</h6>
          <strong>
            {(Math.floor((char.stats.charisma - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.charisma - 10) / 2)}
          </strong>
          <br />
          <FormControl
            type="number"
            value={char.stats.charisma}
            onChange={(e) => handleStatChange("charisma", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
      </Row>
      <Row className="p-2">
        <Col className="border-primary p-2 m-1">
          <h6>Proficiency Bonus</h6>
          <strong>{Math.floor((char.level - 1) / 4) + 2}</strong>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Speed</h6>
          <form className="d-flex justify-content-center">
            <FormControl
              type="number"
              value={char.speed}
              onChange={(e) => handleCharChange("speed", e.target.value)}
              className="w-50 mx-auto"
            />
            <p>ft.</p>
          </form>
        </Col>
        <Col className="border-primary m-1">
          <h6>Initiative</h6>
          <strong>
            {(Math.floor((char.stats.dexterity - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.dexterity - 10) / 2)}
          </strong>
        </Col>
        <Col className="border-primary m-1">
          <h6>Armor Class</h6>
          <FormControl
            type="number"
            value={char.armorClass}
            onChange={(e) => handleCharChange("armorClass", e.target.value)}
            className="w-50 mx-auto"
          />
        </Col>
        <Col className="border-danger m-1 col-3">
          <h6>Health Points</h6>
          <form className="d-flex justify-content-center">
            <strong>Current:</strong>
            <FormControl
              type="number"
              value={char.hitPoints.current}
              onChange={(e) => handleHitPointsChange("current", e.target.value)}
              className="w-50 mx-auto"
            />
            <br />
            &ensp;
            <strong>Max:</strong>
            <FormControl
              type="number"
              value={char.hitPoints.max}
              onChange={(e) => handleHitPointsChange("max", e.target.value)}
              className="w-50 mx-auto"
            />
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Stats;
