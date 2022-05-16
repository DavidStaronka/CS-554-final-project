const express = require("express");
const router = express.Router();
const data = require("../data");
const characterData = data.characters;
const sessionData = data.sessions;

router.post("/", async (req, res) => {
  try {
    let ret;
    //console.log(req.body);
    console.log(req.body)
    if (await sessionData.sessionExists(req.body.session)) {
      const newCharacter = await characterData.createCharacter(req.body);
      console.log(`CHARACTER ${newCharacter.toString()}`);
      await sessionData.addCharacterToSession(req.body.session, newCharacter.toString());
    } else {
      ret = { message: "session does not exist" };
    }

    res.status(200).json(ret);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
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

router.get("/:characterId/:userId", async (req, res) => {
  try {
    console.log(`ROUTE PARAMS${JSON.stringify(req.params, null, 4)}`);

    const characters = await characterData.getCharacter(req.params.characterId, req.params.userId);
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
