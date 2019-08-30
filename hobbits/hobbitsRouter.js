const express = require('express');

const Hobbits = require('./hobbitsModel.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      //const users = await db('users');
      const hobbitsAll = await Hobbits.getAll();
      res.json(hobbitsAll);
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

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
      const count = await Hobbits.remove(id);
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
      
    } catch (err){
      res.status(500).json({ message: 'Failed to delete user' });
    }

});

module.exports = router;