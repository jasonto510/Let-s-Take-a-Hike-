const Trails = require('./trail.js');

exports.getAllTrails = (callback) => {
  console.log('this is getitng hit')
  Trails.find({}, (err, trail) => {
      if (err){
          console.log(err);
          callback(err, null)
          return;
      }
      callback(null, trail)
  })
}

exports.getSingleLocation = (location, callback) => {
  Trails.find({location: location}, (err, trail) => {
    if (err){
      console.log(err)
      callback(err, null)
      return;
    }
    callback(null, trail)
  })
}

exports.addTrail = (newTrail) => {
    var trail = new Trails(newTrail);
    trail.save((err, addedTrail)=> {
    if (err){
      console.log(err);
      return;
    }
    console.log('saved to db')
    return
  })
}