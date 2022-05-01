import { Row, Col, Table, Form, FormControl } from "react-bootstrap";

function Proficiencies(props) {
  const [char, setChar] = props.char;
  const [saved, setSaved] = props.saved;

  const handleProfChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar.proficiencies[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const calcStat = (stat) => {
    return (
      (Math.floor((char.stats[stat] - 10) / 2) +
        (char.proficiencies.stat.includes(stat)
          ? Math.floor((char.level - 1) / 4) + 2
          : 0) <
      0
        ? ""
        : "+") +
      (Math.floor((char.stats[stat] - 10) / 2) +
        (char.proficiencies.stat.includes(stat)
          ? Math.floor((char.level - 1) / 4) + 2
          : 0))
    );
  };

  const calcSkill = (stat, name) => {
    return (
      Math.floor((char.stats[stat] - 10) / 2) +
      (char.proficiencies.skill.includes(name)
        ? Math.floor((char.level - 1) / 4) + 2
        : 0)
    );
  };

  const toggleStat = (stat) => {
    const updatedChar = { ...char };

    const index = updatedChar.proficiencies.stat.indexOf(stat);

    if (index === -1) {
      updatedChar.proficiencies.stat.push(stat);
    } else {
      updatedChar.proficiencies.stat.splice(index, 1);
    }
    setChar(updatedChar);
    setSaved(false);
  };

  const savingThrows = (
    <Col className="border border-3 border-primary m-1">
      <h5>Saving throw modifiers</h5>
      <Table bordered>
        <thead>
          <tr>
            <th>Proficiency</th>
            <th>Stat</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Check
                type="checkbox"
                checked={char.proficiencies.stat.includes("strength")}
                onChange={(e) => toggleStat("strength")}
              />
            </td>
            <td>STR</td>
            <td>{calcStat("strength")}</td>
          </tr>
          <tr>
            <td>
              <Form.Check
                type="checkbox"
                checked={char.proficiencies.stat.includes("constitution")}
                onChange={(e) => toggleStat("constitution")}
              />
            </td>
            <td>CON</td>
            <td>{calcStat("constitution")}</td>
          </tr>
          <tr>
            <td>
              <Form.Check
                type="checkbox"
                checked={char.proficiencies.stat.includes("intelligence")}
                onChange={(e) => toggleStat("intelligence")}
              />
            </td>
            <td>INT</td>
            <td>{calcStat("intelligence")}</td>
          </tr>
          <tr>
            <td>
              <Form.Check
                type="checkbox"
                checked={char.proficiencies.stat.includes("dexterity")}
                onChange={(e) => toggleStat("dexterity")}
              />
            </td>
            <td>DEX</td>
            <td>{calcStat("dexterity")}</td>
          </tr>
          <tr>
            <td>
              <Form.Check
                type="checkbox"
                checked={char.proficiencies.stat.includes("wisdom")}
                onChange={(e) => toggleStat("wisdom")}
              />
            </td>
            <td>WIS</td>
            <td>{calcStat("wisdom")}</td>
          </tr>
          <tr>
            <td>
              <Form.Check
                type="checkbox"
                checked={char.proficiencies.stat.includes("charisma")}
                onChange={(e) => toggleStat("charisma")}
              />
            </td>
            <td>CHA</td>
            <td>{calcStat("charisma")}</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );

  const passiveStats = (
    <Col className="border border-3 border-primary m-1">
      <h5>Passive Stats</h5>
      <Table bordered>
        <tbody>
          <tr>
            <td>Passive WIS (Perception)</td>
            <td>{10 + calcSkill("wisdom", "perception")}</td>
          </tr>
          <tr>
            <td>Passive INT (Investigation)</td>
            <td>{10 + calcSkill("intelligence", "investigation")}</td>
          </tr>
          <tr>
            <td>Passive WIS (Insight)</td>
            <td>{10 + calcSkill("wisdom", "insight")}</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  );

  const proficiencies = (
    <Col className="border border-3 border-primary m-1">
      <h5>Proficiencies</h5>
      <h6>Armor</h6>
      <FormControl
        as="textarea"
        type="textarea"
        value={char.proficiencies.armor}
        onChange={(e) => handleProfChange("armor", e.target.value)}
        className="mx-auto"
      />
      <h6>Weapon</h6>
      <FormControl
        as="textarea"
        type="textarea"
        value={char.proficiencies.weapon}
        onChange={(e) => handleProfChange("weapon", e.target.value)}
        className="mx-auto"
      />
      <h6>Tool</h6>
      <FormControl
        as="textarea"
        type="textarea"
        value={char.proficiencies.tool}
        onChange={(e) => handleProfChange("tool", e.target.value)}
        className="mx-auto"
      />
      <h6>Language</h6>
      <FormControl
        as="textarea"
        type="textarea"
        value={char.proficiencies.language}
        onChange={(e) => handleProfChange("language", e.target.value)}
        className="mx-auto"
      />
    </Col>
  );

  return (
    <Row>
      {savingThrows}
      {passiveStats}
      {proficiencies}
    </Row>
  );
}

export default Proficiencies;
