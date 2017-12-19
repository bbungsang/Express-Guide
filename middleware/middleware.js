var express = require('express')
var app = express()

app.listen(3000)

/*
  next 는 미들웨어 함수에 전달되는 세 번째 인수로,
  next() 메서드를 호출하면 앱 내의 미들웨어 함수가 호출된다.
  다른 이름을 지정해도 좋지만 관례적으로 next 이름을 갖는다.
*/

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use([myLogger, requestTime])

app.get('/', function (req, res) {
  var responseText = 'Hello World!' + '<br>'
  responseText += 'Requested at: ' + req.requestTime;
  res.send(responseText)
})

/* 어플리케이션 레벨 미들웨어 */

app.use('/user/:id', function (req, res, next) {
  console.log('Request URL: ', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route')
  else
    console.log("Not 0")
    next()
}, function (req, res, next) {
  console.log('ID: ' + req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})
