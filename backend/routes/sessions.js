const express = require("express");
const router = express.Router();
const data = require("../data");
const sessionData = data.sessions;

router.get('/', async (req, res) => {
    try {
        const sessionList = await sessionData.getSessions();
        if (!sessionList) return res.status(400).json({ error: 'No sessions created to show' });
        res.status(200).json(sessionList);
        return
    } catch (e) {
        res.status(500).json({ error: e });
        return
    }
});

router.get('/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    if (!sessionId) return res.status(400).json({ error: 'Must provide a session id' });
    if (typeof sessionId !== 'string') return res.status(400).json({ error: 'Session id must be a string' });

    try {
        const session = await sessionData.getSession(sessionId);
        if (!session) return res.status(400).json({ error: 'Session does not exist' });
        res.status(200).json(session);
        return
    } catch (e) {
        res.status(500).json({ error: e });
        return
    }
});

router.post("/", async (req, res) => {
    const { sessionName, characterIds } = req.body;
    if (!sessionName) return res.status(400).json({ error: 'Must provide a session name' });
    if (typeof sessionName !== 'string') return res.status(400).json({ error: 'Session name must be a string' });

    try {
        console.log(req.body);
        const newSession = await sessionData.createSession(sessionName, characterIds);
        res.status(200).json(newSession);
        return
    } catch (e) {
        res.status(500).json({ error: e });
        return
    }
});

router.post("/:sessionId", async (req, res) => {
    const { sessionId } = req.params;
    const { characterId } = req.body;
    if (!sessionId) return res.status(400).json({ error: 'Must provide a session id' });
    if (typeof sessionId !== 'string') return res.status(400).json({ error: 'Session id must be a string' });
    if (!characterId) return res.status(400).json({ error: 'Must provide a character id' });
    if (typeof characterId !== 'string') return res.status(400).json({ error: 'Character id must be a string' });

    try {
        const newSession = await sessionData.addCharacterToSession(sessionId, characterId);
        res.status(200).json(newSession);
        return
    } catch (e) {
        res.status(500).json({ error: e });
        return
    }
});

router.delete('/:sessionId', async (req,res) => {
    const { sessionId } = req.params;
    if (!sessionId) return res.status(400).json({ error: 'Must provide a session id' });
    if (typeof sessionId !== 'string') return res.status(400).json({ error: 'Session id must be a string' });

    try {
        const session = await sessionData.deleteSession(sessionId);
        if (!session) return res.status(400).json({ error: 'Session does not exist' });
        res.status(200).json(session);
        return
    } catch (e) {
        res.status(500).json({ error: e });
        return
    }
});

module.exports = router;