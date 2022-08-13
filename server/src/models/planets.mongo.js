const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true
  }
});

const planetsSchema2 = new mongoose.Schema({any: Object});