import { Container, Row, Col } from "react-bootstrap";

import Stats from "./Stats";
const axios = require("axios");

function CharacterSheet() {
  const char = {
    id: 1,
    profileId: 1,
    dmId: 1,
    sessionId: 1,
    img: "url.com",
    name: "Jerry, Slayer of PCs",
    level: 17,
    race: "Kobold",
    class: "Cleric",
    alignment: "Lawful Good",
    background: "Acolyte",
    description:
      "Jerry was born as a pup, he was found by muriel, who lived in the middle of nowhere",
    feats: "Grappler",
    inventory: "Map, Torch, a single gold coin",
    weapons: [
      {
        name: "Longsword",
        damage: "1d8",
        reach: "5ft",
        damageType: "slashing",
        properties: "magic",
      },
      {
        name: "Club",
        damage: "1d8",
        reach: "5ft",
        damageType: "bludgeoning",
        properties: "",
      },
    ],
    spells: {},
    spellSlots: [2, 1, 0, 0, 0],
    stats: {
      strength: 20,
      dexterity: 21,
      constitution: 22,
      intelligence: 19,
      wisdom: 8,
      charisma: 17,
    },
    speed: 30,
    armorClass: 20,
    hitPoints: {
      current: 30,
      max: 30,
    },
    condition: "poisoned",
    inpiration: 4,
    proficiencies: {
      skill: ["Animal Handling", "Insight"],
      armor: ["Heavy", "Light"],
      weapons: ["Martial", "Simple"],
      tools: ["Lockpick"],
      languages: ["Commmon", "Infernal", "English"],
    },
  };
  return (
    <Container className="border border-3 border-secondary my-5 mx-auto p-3">
      <Stats char={char} />
      <Row className="p-md-3">
        <Col className="border border-primary p-5">1 of 3</Col>
        <Col className="border border-primary p-5">2 of 3</Col>
        <Col className="border border-primary p-5">3 of 3</Col>
      </Row>
    </Container>
  );
}

export default CharacterSheet;
