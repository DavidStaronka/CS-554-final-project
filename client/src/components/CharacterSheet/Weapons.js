import { Col, FormControl, Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function Weapons(props) {
  const [char, setChar] = props.char;
  // const weaponNum = props.weaponNum;
  const setSaved = props.saved[1];
  let weaponList = [];

  // const handleCharChange = (stat, val) => {
  //   const updatedChar = { ...char };
  //   updatedChar[stat] = val;
  //   setChar(updatedChar);
  //   setSaved(false);
  // };

  const handleWeaponChange = (weapon, sub, val) => {
    const updatedChar = { ...char };

    const index = updatedChar.weapons.indexOf(weapon);

    updatedChar.weapons[index][sub] = val;
    setChar(updatedChar);
    setSaved(false);
  };

  const handleWeaponDelete = (weapon) => {
    const updatedChar = { ...char };

    const index = updatedChar.weapons.indexOf(weapon);

    updatedChar.weapons.splice(index, 1);

    setChar(updatedChar);
    setSaved(false);
  };

  const addWeapon = () => {
    const updatedChar = { ...char };

    updatedChar.weapons.push({
      name: "name",
      description: "description",
      id: uuidv4(),
    });
    setChar(updatedChar);
    setSaved(false);
  };

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

  const makeForms = (weaponNum) => {
    for(let i=0;i<weaponNum;i++){
      weaponList.push(
        <tr key={i}>
          <td>
            <FormControl
              type="text"
              value={char.weapons[i].name}
              onChange={(e) => handleWeaponChange(char.weapons[i], "name", e.target.value)}
              className="mx-auto"
            />
          </td>
          <td>
            <FormControl
              as="textarea"
              type="text"
              value={char.weapons[i].description}
              onChange={(e) => handleWeaponChange(char.weapons[i], "description", e.target.value)}
              className="mx-auto"
            />
          </td>
          <td>
            <Button onClick={(e) => handleWeaponDelete(char.weapons[i])}>Delete</Button>
          </td>
        </tr>
      );
    } 
  }

  makeForms(char.weapons.length);

  return (
      <Col className=" border-primary m-1">
        <h5>Weapons</h5>
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: "65%" }}>Description</th>
            </tr>
          </thead>
          <tbody>{weaponList}</tbody>
        </Table>
        <Button
          onClick={(e) => {
            addWeapon();
          }}
        >
          Add Weapon
        </Button>
      </Col>
    
  );
}
export default Weapons;
