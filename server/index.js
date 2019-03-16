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
      console.log('something is owkring')
    if (err){
      res.status(400).end();
    }
    res.status(200).send(trail);
  })
})

app.get('/singleTrail/:location', (req, res) => {
  let location = req.params.location;
  controller.getSingleLocation(location, (err, trail) => {
    if (err){
      res.status(400).end()
    }
    res.status(200).send(trail);
  })
})

app.post('/hikingTrails', (req, res) => {
  controller.addTrail(req.body, (err, data) => {
      if (err){
          console.log(err)
          res.status(404).end()
      }
      res.status(200).send()
      console.log('saved to db')
  })
})

app.listen(port, () => console.log('you are listening on port ' + port));


