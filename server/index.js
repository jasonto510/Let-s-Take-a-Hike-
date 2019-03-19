const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
const controller = require('../database/controllers.js')


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/dist`))

app.get('/hikingTrails', (req, res) => {
  controller.getAllTrails((err, trail) => {
      // console.log('something is owkring')
    if (err){
      res.status(400).end();
    }
    res.status(200).send(trail);
  })
})

// app.get('/singleTrail/:location', (req, res) => {
//   let location = req.params.location;
//   controller.getSingleLocation(location, (err, trail) => {
//     if (err){
//       res.status(400).end()
//     }
//     res.status(200).send(trail);
//   })
// })

app.put('/changeDescription', (req, res) => {
  controller.changeDescription(req.body, (err) => {
    if (err){
      console.log(err)
      res.status(400).end();
    }
    res.status(200).end()
  })
})

// app.get('/getTheTrail/:latitude/:longitude/:maxDistance/:maxResults', (req, res) => {
//   let latitude = req.params.latitude;
//   let longitude = req.params.longitude;
//   let distance = req.params.maxDistance;
//   let results = req.params.maxResults
//   console.log(latitude, longitude, distance, results)
//   res.status(200).end()
// })



app.post('/hikingTrails', (req, res) => {
  controller.addTrail(req.body, (err) => {
      if (err){
          console.log(err)
          res.status(404).end()
      }
      res.status(200).send()
      console.log('saved to db')
  })
})

app.listen(port, () => console.log('you are listening on port ' + port));


