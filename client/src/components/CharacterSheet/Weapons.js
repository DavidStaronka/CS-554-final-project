import { Col, FormControl } from "react-bootstrap";

function Weapons(props) {
  const [char, setChar] = props.char;
  const [saved, setSaved] = props.saved;

  const handleWeaponChange = () => {};

  const mapWeapon = (weapon) => {
    return (
      <div>
        <h6>
          Name:
          <FormControl
            type="text"
            value={weapon.name}
            onChange={(e) => handleWeaponChange("name", e.target.value)}
            className="w-50 mx-auto"
          />
        </h6>
      </div>
    );
  };

  return (
    <Col className=" border-primary m-1">{char.weapons.map(mapWeapon)}</Col>
  );
}
export default Weapons;
