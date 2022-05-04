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
    res.sendStatus(500);
  }
});

module.exports = router;
