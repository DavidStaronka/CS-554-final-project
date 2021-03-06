const express = require("express");
const router = express.Router();
const data = require("../data");
const sessionData = data.sessions;
const userData = data.users;

/*
router.get("/", async (req, res) => {
  if (!req.body.userId) {
    res.status(403).send("No permission, please login first");
    return;
  }

  try {
    const userExists = await userData.userExists(req.body.userId);
    if (!userExists) return res.status(403).json({ error: "Must be a Dungeon Master" });
  } catch (e) {}

  try {
    const sessionList = await sessionData.getSessions();
    if (!sessionList) return res.status(400).json({ error: "No sessions created to show" });
    res.status(200).json(sessionList);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});
*/

/*
router.get("/exists/:sessionName/:userId", async (req, res) => {
  const { sessionName } = req.params.sessionName;
  if (!sessionName) return res.status(400).json({ error: "Must provide a session id" });
  if (typeof sessionName !== "string")
    return res.status(400).json({ error: "Session id must be a string" });

  //Must be a DM
  if (!req.params.userId) {
    res.status(403).send("No permission, please login first");
    return;
  }

  try {
    const userExists = await userData.userExists(req.params.userId);
    if (!userExists) return res.status(403).json({ error: "Must be a Dungeon Master" });
  } catch (e) {}

  try {
    const session = await sessionData.sessionExists(sessionName);
    if (!session) return res.status(400).json({ error: "Session does not exist" });
    res.status(200).json(session);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});
*/

router.get("/sessions/:userId", async (req, res) => {
  try {
    console.log(req.params.userId);
    const sessions = await sessionData.getSessions(req.params.userId);
    res.status(200).json(sessions);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:sessionId/:userId", async (req, res) => {
    const sessionId = req.params.sessionId;
    if (!sessionId) return res.status(400).json({ error: "Must provide a session id" });
    if (typeof sessionId !== "string")
      return res.status(400).json({ error: "Session id must be a string" });
  
    if (!req.params.userId) {
      res.status(403).send("No permission, please login first"); 
      return;
    }
    // console.log("q: " + req.params.userId);
  
    try {
      const userExists = await userData.userExists(req.params.userId);
      if (!userExists) return res.status(403).json({ error: "Must be a Dungeon Master" });
    } catch (e) {}
  
    // console.log("e: " + req.params.userId);
    try {
      const session = await sessionData.getSession(sessionId, req.params.userId);
      if (!session) return res.status(400).json({ error: "Session does not exist" });
      res.status(200).json(session);
      return;
    } catch (e) {
      res.status(500).json({ error: e });
      return;
    }
  });

router.post("/", async (req, res) => {
  // Must be a DM
  console.log(req.body.userId);
  if (!req.body.userId) {
    res.status(403).send("No permission, please login first");
    return;
  }

  const { sessionName, characterIds, userId } = req.body;

  try {
    const userExists = await userData.userExists(userId);
    if (!userExists) return res.status(403).json({ error: "Must be a Dungeon Master" });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }

  if (!sessionName) return res.status(400).json({ error: "Must provide a session name" });
  if (typeof sessionName !== "string") {
    return res.status(400).json({ error: "Session name must be a string" });
  }

  try {
    console.log(req.body);
    const newSession = await sessionData.createSession(sessionName, userId, characterIds);
    res.status(200).json(newSession);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.post("/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  const { characterId } = req.body;
  if (!sessionId) return res.status(400).json({ error: "Must provide a session id" });
  if (typeof sessionId !== "string")
    return res.status(400).json({ error: "Session id must be a string" });
  if (!characterId) return res.status(400).json({ error: "Must provide a character id" });
  if (typeof characterId !== "string")
    return res.status(400).json({ error: "Character id must be a string" });

  if (!req.body.userId) {
    res.status(403).send("No permission, please login first");
    return;
  }

  try {
    const userExists = await userData.userExists(req.body.userId);
    if (!userExists) return res.status(403).json({ error: "Must be a Dungeon Master" });
  } catch (e) {}

  try {
    const newSession = await sessionData.addCharacterToSession(sessionId, characterId);
    res.status(200).json(newSession);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.delete("/:sessionId", async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId) return res.status(400).json({ error: "Must provide a session id" });
  if (typeof sessionId !== "string")
    return res.status(400).json({ error: "Session id must be a string" });

  if (!req.body.userId) {
    res.status(403).send("No permission, please login first");
    return;
  }

  try {
    const userExists = await userData.userExists(req.body.userId);
    if (!userExists) return res.status(403).json({ error: "Must be a Dungeon Master" });
  } catch (e) {}

  try {
    const session = await sessionData.deleteSession(sessionId);
    if (!session) return res.status(400).json({ error: "Session does not exist" });
    res.status(200).json(session);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
