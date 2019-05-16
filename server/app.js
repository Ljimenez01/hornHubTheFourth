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

  let plate = req.body.plate
  let state = req.body.state
  let email = req.body.email

  let report = models.Report.build({

    plate: plate,
    state: state,
    email: email
  })

  report.save().then((savedReport) => {
    if(savedReport) {
      res.json({success: true})
    } else {
      res.json({success:false, message: 'Your report was not saved'})
    }
  })

})

app.get('/api/reports',(req,res) => {

  models.Report.findAll()
  .then((reports) => res.json(reports))
})


app.post('/api/search', (req,res) => {
  console.log("search")
  models.Report.findAll({
    where: {
      plate: req.body.plate,
      state: req.body.state
    }
    }).then(reports => res.json(reports))
})

app.listen(PORT,() => {
  console.log('Server is running biatch...')
})
