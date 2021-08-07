require('dotenv').config();

const mongoose = require('mongoose');
const Tech = require('./tech');
const Log = require('./logs');
const { connectDB } = require('../db/db');
connectDB();

const seedTech = async () => {
  try {
    const logs = await Log.insertMany([
      {
        message: 'الفول جو السيرفر',
        attention: true,
        tech: '610abb97427b157a842a4b12'
      },
      {
        message: 'Fixed hard drive on workstation 002',
        tech: '610abb97427b157a842a4b13'
      },
      {
        message: '1122 wireless down',
        attention: true,
        tech: '610abb97427b157a842a4b14'
      },
      {
        message: 'Workstation 026 is up and running',
        tech: '610abb97427b157a842a4b14'
      }
    ]);
  } catch (error) {
    console.log(error, 'error');
  }
};
seedTech();
