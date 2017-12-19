var express = require('express')
var app = express()
var router = express.Router()

app.listen(3000)

/* 라우터 레벨 미들웨어 */
// express.Router() 인스턴스에 바인드된다는 점을 제외하면 애플리케이션 레벨 미들웨어와 동일한 방식으로 작동한다.

router.use(function (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.use('/user/:id', function (req, res, next) {
  console.log('Request URL: ' + req.originalUrl)
  next()
}), function (req, res, next) {
  console.log('Request Type: ' + req.method)
  next()
}

router.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route')
  else next()
}, function (req, res, next) {
  res.send(req.params.id)
})

router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)