import { Col, FormControl } from "react-bootstrap";
// import { v4 as uuidv4 } from "uuid";

function Inventory(props) {
  const [char, setChar] = props.char;
  const setSaved = props.saved[1];

  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  // const handleWeaponChange = (weapon, sub, val) => {
  //   const updatedChar = { ...char };

  //   const index = updatedChar.weapons.indexOf(weapon);

  //   updatedChar.weapons[index][sub] = val;
  //   setChar(updatedChar);
  //   setSaved(false);
  // };

  // const handleWeaponDelete = (weapon) => {
  //   const updatedChar = { ...char };

  //   const index = updatedChar.weapons.indexOf(weapon);

  //   updatedChar.weapons.splice(index, 1);

  //   setChar(updatedChar);
  //   setSaved(false);
  // };

  // const addWeapon = () => {
  //   const updatedChar = { ...char };

  //   updatedChar.weapons.push({
  //     name: "name",
  //     description: "description",
  //     id: uuidv4(),
  //   });
  //   setChar(updatedChar);
  //   setSaved(false);
  // };

  // const mapWeapon = (weapon) => {
  //   return (
  //     <tr key={uuidv4()}>
  //       <td>
  //         <FormControl
  //           type="text"
  //           value={weapon.name}
  //           onChange={(e) => handleWeaponChange(weapon, "name", e.target.value)}
  //           className="mx-auto"
  //         />
  //       </td>
  //       <td>
  //         <FormControl
  //           as="textarea"
  //           type="text"
  //           value={weapon.description}
  //           onChange={(e) => handleWeaponChange(weapon, "description", e.target.value)}
  //           className="mx-auto"
  //         />
  //       </td>
  //       <td>
  //         <Button onClick={(e) => handleWeaponDelete(weapon)}>Delete</Button>
  //       </td>
  //     </tr>
  //   );
  // };

  return (
    <Col className=" border-primary m-1">
      <h5>Inventory</h5>
      <FormControl
        as="textarea"
        type="textarea"
        value={char.inventory}
        onChange={(e) => handleCharChange("inventory", e.target.value)}
        className=" mx-auto"
      />
    </Col>
  );
}
export default Inventory;
