import { Col, Table, Form } from "react-bootstrap";

function Skills(props) {
  const [char, setChar] = props.char;
  const [saved, setSaved] = props.saved;

  const formatSkill = (name, stat) => {
    const dict = {
      dexterity: "DEX",
      strength: "STR",
      wisdom: "WIS",
      intelligence: "INT",
      charisma: "CHA",
      constitution: "CON",
    };
    const calcStat = () => {
      return (
        (Math.floor((char.stats[stat] - 10) / 2) +
          (char.proficiencies.skill.includes(name)
            ? Math.floor((char.level - 1) / 4) + 2
            : 0) <
        0
          ? ""
          : "+") +
        (Math.floor((char.stats[stat] - 10) / 2) +
          (char.proficiencies.skill.includes(name)
            ? Math.floor((char.level - 1) / 4) + 2
            : 0))
      );
    };
    const toggleSkill = (skill) => {
      const updatedChar = { ...char };

      const index = updatedChar.proficiencies.skill.indexOf(skill);

      if (index === -1) {
        updatedChar.proficiencies.skill.push(skill);
      } else {
        updatedChar.proficiencies.skill.splice(index, 1);
      }
      setChar(updatedChar);
      setSaved(false);
    };

    return (
      <tr>
        <td>
          <Form.Check
            type="checkbox"
            checked={char.proficiencies.skill.includes(name)}
            onChange={(e) => toggleSkill(name)}
          />
        </td>
        <td>{dict[stat]}</td>
        <td>{name}</td>
        <td>{calcStat()}</td>
      </tr>
    );
  };
  return (
    <Col className="border-primary m-1 col-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>PROF</th>
            <th>MOD</th>
            <th>SKILL</th>
            <th>BONUS</th>
          </tr>
        </thead>
        <tbody>
          {formatSkill("Acrobatics", "dexterity")}
          {formatSkill("Animal Handling", "wisdom")}
          {formatSkill("Arcana", "intelligence")}
          {formatSkill("Athletics", "strength")}
          {formatSkill("Deception", "charisma")}
          {formatSkill("History", "intelligence")}
          {formatSkill("Insight", "wisdom")}
          {formatSkill("Intimidation", "charisma")}
          {formatSkill("Investigation", "intelligence")}
          {formatSkill("Medicine", "wisdom")}
          {formatSkill("Nature", "intelligence")}
          {formatSkill("Perception", "wisdom")}
          {formatSkill("Performance", "charisma")}
          {formatSkill("Persuasion", "charisma")}
          {formatSkill("Religion", "intelligence")}
          {formatSkill("Sleight of Hand", "dexterity")}
          {formatSkill("Stealth", "dexterity")}
          {formatSkill("Survival", "wisdom")}
        </tbody>
      </Table>
    </Col>
  );
}

export default Skills;
