const express = require('express');
const db = require('../data/dbConfig.js');

const Hobbits = require('../hobbits/hobbitsModel.js');

const hobbitsRouter = require('../hobbits/hobbitsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/hobbits', hobbitsRouter)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/serverworks', (req,res) => {
  res.status(200).json({serverWorking: 'yes'});
})

server.get('/hobbits', (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(rows);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
