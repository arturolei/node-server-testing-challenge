const express = require('express');

const Hobbits = require('./hobbitsModel.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      //const users = await db('users');
      const hobbitsAll = await Hobbits.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get any hobbits' });
    }
  });

router.post('/', async (req, res) => {
    const hobbitData = req.body;
  
    try {
      const newHobbit = await Hobbits.insert(hobbitData);
      res.status(201).json(newHobbit);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new user' });
    }
  });

module.exports = router;