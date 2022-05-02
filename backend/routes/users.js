const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;


router.post('create/:id/:email', async (req, res) => {
    try {
      const newUser = await userData.create(req.params.id, req.params.email)
      res.status(200).json(newUser);
    } catch (e) {
      res.sendStatus(500);
    }
  });

module.exports = router