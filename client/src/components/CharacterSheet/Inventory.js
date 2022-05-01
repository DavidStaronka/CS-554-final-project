import { Row, Col, FormControl, Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function Inventory(props) {
  const [char, setChar] = props.char;
  const [saved, setSaved] = props.saved;

  const handleWeaponChange = () => {};
  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const mapWeapon = (weapon) => {
    return (
      <tr key={uuidv4()}>
        <td>
          <FormControl
            type="text"
            value={weapon.name}
            onChange={(e) => handleWeaponChange("name", e.target.value)}
            className="mx-auto"
          />
        </td>
        <td>
          <FormControl
            as="textarea"
            value={weapon.description}
            onChange={(e) => handleWeaponChange("description", e.target.value)}
            className="mx-auto"
          />
        </td>
      </tr>
    );
  };

  return (
    <Row>
      <Col className=" border-primary m-1">
        <h5>Weapons</h5>
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: "65%" }}>Description</th>
            </tr>
          </thead>
          <tbody>{char.weapons.map(mapWeapon)}</tbody>
        </Table>
      </Col>
      <Col className=" border-primary m-1">
        <h5>Inventory</h5>
        <FormControl
          as="textarea"
          type="textarea"
          value={char.inventory}
          onChange={(e) => handleCharChange("inventory", e.target.value)}
          className="mx-auto"
        />
      </Col>
    </Row>
  );
}
export default Inventory;
