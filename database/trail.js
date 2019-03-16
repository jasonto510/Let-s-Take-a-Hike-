const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
  hikeId: Number,
  name: String,
  difficulty: String,
  low: Number, 
  high: Number,
  summary: String,
  location: String,
  length: Number,
  stars: Number,
  longitude: Number,
  latitude : Number
});

const Trails = mongoose.model('Trails', trailSchema);

module.exports = Trails;