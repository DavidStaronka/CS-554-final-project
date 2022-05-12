const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/', async (req, res) => {
    try {
      const user = await userData.getUser(req.params.firebaseuid)
      res.status(200).json(user);
      return
    } catch (e) {
      res.sendStatus(500);
      return 
    }
});

module.exports = router