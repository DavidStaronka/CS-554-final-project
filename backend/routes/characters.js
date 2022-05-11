const express = require("express");
const router = express.Router();
const data = require("../data");
const characterData = data.characters;

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await characterData.createCharacter(req.body);
    res.status(200).json({});
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/characters/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    const characters = await characterData.getCharacters(req.params.userId);
    res.status(200).json(characters);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:characterId", async (req, res) => {
  try {
    console.log(`ROUTE CHARID ${req.params.characterId}`);
    const characters = await characterData.getCharacter(req.params.characterId, req.body.userId);
    res.status(200).json(characters);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/:characterId", async (req, res) => {
  try {
    console.log(`UPDATE CHAR BODY ${req.body}`);
    const character = await characterData.updateCharacter(req.body);
    res.status(200).json(character);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
