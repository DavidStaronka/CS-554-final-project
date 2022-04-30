import { Col, Table, FormControl, Button } from "react-bootstrap";

function Spells(props) {
  const [char, setChar] = props.char;
  const [saved, setSaved] = props.saved;

  const formatSpellLevels = (level) => {
    const spellLevel = {
      0: "Cantrip",
      1: "1st Level",
      2: "2nd Level",
      3: "3rd Level",
      4: "4th Level",
      5: "Fifth Level",
      6: "Sixth Level",
      7: "Seventh Level",
      8: "Eight Level",
      9: "Ninth Level",
    };

    const formatSpell = (spell) => {
      const handleSpellChange = (spell, sub, val) => {
        const updatedChar = { ...char };

        const index = updatedChar.spells.indexOf(spell);

        updatedChar.spells[index][sub] = val;
        setChar(updatedChar);
        setSaved(false);
      };
      const handleSpellDelete = (spell) => {
        const updatedChar = { ...char };

        const index = updatedChar.spells.indexOf(spell);

        updatedChar.spells.splice(index, 1);

        setChar(updatedChar);
        setSaved(false);
      };
      return (
        <tr>
          <td>
            <FormControl
              type="text"
              value={spell.name}
              onChange={(e) => handleSpellChange(spell, "name", e.target.value)}
              className="mx-auto"
            />
          </td>
          <td>
            <FormControl
              as="textarea"
              value={spell.description}
              onChange={(e) =>
                handleSpellChange(spell, "description", e.target.value)
              }
              className="mx-auto"
              style={{ height: "75px" }}
            />
          </td>
          <td>
            <Button onClick={(e) => handleSpellDelete(spell)}>Delete</Button>
          </td>
        </tr>
      );
    };

    const addSpell = (level) => {
      const updatedChar = { ...char };

      updatedChar.spells.push({
        name: "Sample name",
        description: "Sample description",
        level: level,
      });
      setChar(updatedChar);
      setSaved(false);
    };
    return (
      <div className="border border-secondary border-2 m-1">
        <h6>{spellLevel[level]}</h6>
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {char.spells.map((spell) => {
              if (spell.level === level) {
                return formatSpell(spell);
              }
            })}
          </tbody>
        </Table>
        <Button onClick={(e) => addSpell(level)}>Add Spell</Button>
      </div>
    );
  };

  return (
    <Col className=" border-primary m-1">
      <h5>Spells</h5>
      {[...Array(10).keys()].map(formatSpellLevels)}
    </Col>
  );
}

export default Spells;
