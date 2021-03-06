const express = require('express');
const app = express()
const models = require('./models')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 8000

app.use(cors())
app.use(bodyParser.json())

let reports = [
  {plate: 'xyz774', state: 'TX', email: 'me@me.com'},
  {plate: 'api144', state: 'TX', email: 'me@notme.com'}
]

app.post('/api/reports',(req,res) => {

  console.log(req.body)

  let plate = req.body.plate
  let state = req.body.state
  let email = req.body.email
  let latitude = req.body.latitude
  let longitude = req.body.longitude
  let report = models.Report.build({

    plate: plate,
    state: state,
    email: email,
    latitude: latitude,
    longitude: longitude
  })

  // saving the reports in jason 27:59

  report.save().then((savedReport) => {
    if(savedReport) {
      res.json({success: true})
    } else {
      res.json({success:false, message: 'Your report was not saved'})
    }
  })

})

app.get('/api/reports',(req,res) => {
  // this is going to return JSON back so we can fetch from it
  models.Report.findAll()
  .then((reports) => res.json(reports))
})


app.put('/api/updateReport', (req,res) => {
  console.log("search")
  models.Report.findOne({
    where: {
      plate: req.body.plate,
      state: req.body.state,
      // latitude: req.body.latitude,
      // longitude: req.body.longitude
    }
  }).then(report => {
    console.log(report)
    if(report){
      report.update({
          latitude:req.body.latitude,
          longitude:req.body.longitude
        })
        .then(function(updated) {
          res.json(updated)
        })
    }
    else {
      res.json(0)
    }

  })
})

app.listen(PORT,() => {
  console.log('Server is running biatch...')
})
