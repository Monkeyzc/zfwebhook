
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')

var app = express()

const port = process.env.PORT || 8080
const DingTalkWebhook = 'https://oapi.dingtalk.com/robot/send?access_token=1507a41bc7f239d1ed537b07b7dbe1a7f7337ff4cd01ef46651fab93dfffb872'
const atMobiles = ['13051149394']

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

/**
bug 推送消息内容
  {
    "event": "issue_impact_change",
    "payload_type": "issue",
    "payload": {
      "display_id": 123 ,
      "title": "Issue Title" ,
      "method": "methodName of issue",
      "impact_level": 2,
      "crashes_count": 54,
      "impacted_devices_count": 16,
      "url": "http://crashlytics.com/full/url/to/issue"
    }
  }
*/
var sendIssueToDingTalk = function (payload, callback) {
  var markdown = {
    title: 'displayName iOS 测试包',
    text: `#### Title: ${payload.title} \n > 1. method: ${payload.method}\n > 2. impact_level: ${payload.impact_level}\n > 3. crashes_count: ${payload.crashes_count}\n >4. impacted_devices_count: ${payload.impacted_devices_count} > 4. [url](${payload.url})\n 
        @13051149394
        `
  }

  var dingtalkData = {
     "msgtype": "markdown",
     "markdown": markdown,
      "at": {
         "atMobiles": atMobiles, 
         "isAtAll": false
     }
  }
  var dingtalkOptions = {
    url: DingTalkWebhook,
    headers: {'Content-Type': 'application/json ;charset=utf-8'},
    method: 'POST',
    json: true,
    body: dingtalkData
  }

  request(dingtalkOptions, function (err, httpResponse, body) {
    console.log(err)
    console.log(httpResponse)
    console.log(body)
    callback()
  })
}


app.post('', function (req, res) {
  console.log(req.body)

  var body = req.body
  if (body.event && body.event === 'verification') {
    res.send({mes: 'verification post'})
  } else if (body.event && body.event === 'issue_impact_change') {
    sendIssueToDingTalk(body.payload, function () {
      res.send({mes: 'issue_impact_change post'})
    })
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
