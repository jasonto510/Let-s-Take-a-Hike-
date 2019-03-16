const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trails');

const db = mongoose.connection;

db.on('err', () => {
  console.log('database did not connect')
})

db.once('open', () => {
  console.log('database successfully connected')
})

module.exports = db;