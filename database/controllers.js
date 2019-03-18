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
    // var trail = new Trails(newTrail);
    Trails.update({name: newTrail.name}, newTrail, {upsert: true}, (err)=> {
    if (err){
      console.log(err);
      return;
    }
    console.log('saved to db')
    return
  })
}

exports.changeDescription = (changedTrail) => {
  Trails.updateOne({_id: changedTrail._id}, {$set: {summary: changedTrail.summary}}, (err) => {
    if (err){
      console.log(err)
      return
    }
    console.log("changed in database")
    return;
  })
}


