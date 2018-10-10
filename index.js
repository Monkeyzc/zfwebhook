
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var app = express()

const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('', function (req, res) {
  console.log(req.body)

  var body = req.body
  if (body.event && body.event === 'verification') {
    res.send({mes: 'verification post'})
  } else if (body.event && body.event === 'issue_impact_change') {
    res.send({mes: 'issue_impact_change post'})
  } else {
    res.send({mes: 'default post'})
  }
})

app.get('/test', function (req, res) {
  res.send({mes: 'hello world'})
})

app.listen(port, function (req, res) {
  console.log('server is listening on 8080')
})