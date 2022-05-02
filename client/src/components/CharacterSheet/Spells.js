import { Col, Table, FormControl, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function Spells(props) {
  const [char, setChar] = props.char;
  const setSaved = props.saved[1];

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
        <tr key={uuidv4()}>
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
    const handleSpellSlotsChange = (attr, level, val) => {
      const updatedChar = { ...char };

      updatedChar.spellSlots[attr][level] = val;

      setChar(updatedChar);
      setSaved(false);
    };
    const formatSpellSlots = () => {
      if (level === 0) {
        return <></>;
      }
      return (
        <form className="d-flex justify-content-center">
          <strong>Current spell slots:</strong>
          <FormControl
            type="number"
            value={char.spellSlots.current[level - 1]}
            onChange={(e) =>
              handleSpellSlotsChange("current", level - 1, e.target.value)
            }
            className="w-25 mx-auto"
          />
          <br />
          &ensp;
          <strong>Max spell slots:</strong>
          <FormControl
            type="number"
            value={char.spellSlots.max[level - 1]}
            onChange={(e) =>
              handleSpellSlotsChange("max", level - 1, e.target.value)
            }
            className="w-25 mx-auto"
          />
        </form>
      );
    };
    return (
      <div className="border border-warning border-3 m-1" key={uuidv4()}>
        <h5>{spellLevel[level]}</h5>
        {formatSpellSlots()}
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
              return <tr key={uuidv4()}></tr>;
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
