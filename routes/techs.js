const express = require('express');
const router = express.Router();

const Techs = require('../models/tech');

// @Route get api/techs
// @desc   get all techs
// @access  pubic

router
  .route('/')
  .get(async (req, res) => {
    try {
      const techs = await Techs.find({});
      res.json(techs);
    } catch (error) {
      res.status(500).json('serverError');
    }
  })
  .post(async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const newTech = new Techs({
        firstName,
        lastName
      });
      await newTech.save();
      res.json(newTech);
    } catch (error) {
      res.status(500).json('server error ');
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const techs = await Techs.find({});
    if (techs.length > 4) {
      const deleteTech = await Techs.findByIdAndDelete(id);
      res.json(deleteTech);
    } else {
      throw Error('You can`t remove all Techs the company will fail');
    }
  } catch (error) {
    if (error.message === 'You can`t remove all Techs the company will fail') {
      res.status(400), res.json(error.message);
    } else {
      res.status(500).res.json('serverError');
    }
  }
});
module.exports = router;
