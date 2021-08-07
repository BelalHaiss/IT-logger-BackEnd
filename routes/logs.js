const Log = require('../models/logs');
const express = require('express');
const router = express.Router();

const Logs = require('../models/logs');

// @Route get api/logs
// @desc   get all logs
// @access  pubic

router
  .route('/')
  .get(async (req, res) => {
    try {
      const logs = await Logs.find({}).populate('tech');
      res.json(logs);
    } catch (error) {
      res.status(500).json('serverError');
    }
  })
  .post(async (req, res) => {
    try {
      if (Object.keys(req.body).length >= 3) {
        const { message, attention, tech } = req.body;

        const newLog = await Logs.create(req.body);
        const populatedLog = await Logs.findById(newLog._id).populate('tech');
        res.json(populatedLog);
      } else {
        throw Error('Something wrong with the request ');
      }
    } catch (error) {
      const theError = error.message ? error.message : 'server error ';
      res.status(500).json(theError);
    }
  });

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { message, tech, attention, date } = req.body;

    const updateLog = await Logs.findByIdAndUpdate(
      id,
      { $set: { message, tech, attention, date } },
      { runValidators: true, new: true }
    );
    const populatedLog = await Logs.findById(updateLog._id).populate('tech');

    res.json(populatedLog);
  } catch (error) {
    res.status(500).json('server error ');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const logs = await Logs.find({});
    if (logs.length > 4) {
      const updateLog = await Logs.findByIdAndDelete(id);
      res.json(updateLog);
    } else {
      throw Error(
        'It has to be at least 4 Logs for the Website, you can add one and remove it :)'
      );
    }
  } catch (error) {
    res.status(400), res.json(error.message);
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const search = await Logs.aggregate().search({
      index: 'text',
      text: {
        query: q,
        path: {
          wildcard: '*'
        }
      }
    });

    if (search.length > 0) {
      return res.json(search);
    } else {
      res.json('no results');
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
