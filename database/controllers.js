const Trails = require('./trail.js');

exports.getAllTrails = (callback) => {
  Trails
  .find({})
  .exec(callback)
}

exports.getSingleLocation = (newLocation, callback) => {
  console.log(`this is geting hit "${newLocation}"`)
  Trails
    .find({location: newLocation})
    .exec(callback)
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