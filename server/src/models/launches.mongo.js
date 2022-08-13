const mongoose = require('mongoose');


const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    default: 100,
    required: true,
    min: 100,
    max: 9999
  },
  launchDate: {
    type: Date,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  rocket: {
    type: String,
    required: true
  },
  target: {
    type: String,
    //type: mongoose.ObjectId (references another collection)
    // almost simulating a foreign key from SQL. (so, not good)
    required: true
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true
  },
  sucess: {
    type: Boolean,
    required: true,
    default: true
  },
})