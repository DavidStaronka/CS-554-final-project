import { Col, Row } from "react-bootstrap";

function Stats(props) {
  const char = props.char;
  return (
    <div>
      <Row className="p-2">
        <Col className="border-primary p-2 m-1">
          <h6>Strength</h6>
          <strong>
            {(Math.floor((char.stats.strength - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.strength - 10) / 2)}
          </strong>
          <br />
          <p className="border border-2 border-secondary rounded-circle">
            {char.stats.strength}
          </p>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Dexterity</h6>
          <strong>
            {(Math.floor((char.stats.dexterity - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.dexterity - 10) / 2)}
          </strong>
          <br />
          <p className="border border-2 border-secondary rounded-circle">
            {char.stats.dexterity}
          </p>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Constitution</h6>
          <strong>
            {(Math.floor((char.stats.constitution - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.constitution - 10) / 2)}
          </strong>
          <br />
          <p className="border border-2 border-secondary rounded-circle">
            {char.stats.constitution}
          </p>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Intelligence</h6>
          <strong>
            {(Math.floor((char.stats.intelligence - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.intelligence - 10) / 2)}
          </strong>
          <br />
          <p className="border border-2 border-secondary rounded-circle">
            {char.stats.intelligence}
          </p>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Wisdom</h6>
          <strong>
            {(Math.floor((char.stats.wisdom - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.wisdom - 10) / 2)}
          </strong>
          <br />
          <p className="border border-2 border-secondary rounded-circle">
            {char.stats.wisdom}
          </p>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Charisma</h6>
          <strong>
            {(Math.floor((char.stats.charisma - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.charisma - 10) / 2)}
          </strong>
          <br />
          <p className="border border-2 border-secondary rounded-circle">
            {char.stats.charisma}
          </p>
        </Col>
      </Row>
      <Row className="p-2">
        <Col className="border-primary p-2 m-1">
          <h6>Proficiency Bonus</h6>
          <strong>{Math.floor((char.level - 1) / 4) + 2}</strong>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Speed</h6>
          <strong>{char.speed} ft.</strong>
          <br />
          <p className="font-weight-light">walking</p>
        </Col>
        <Col className="border-primary p-2 m-1">
          <h6>Initiative</h6>
          <strong>
            {(Math.floor((char.stats.dexterity - 10) / 2) < 0 ? "" : "+") +
              Math.floor((char.stats.dexterity - 10) / 2)}
          </strong>
        </Col>
      </Row>
    </div>
  );
}

export default Stats;
