const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;


router.post('/create/:firebaseuid/:email', async (req, res) => {
    try {
      const newUser = await userData.create(req.params.firebaseuid, req.params.email)
      res.status(200).json(newUser);
    } catch (e) {
      res.sendStatus(500);
    }
});

module.exports = router