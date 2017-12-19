var express = require('express')
var app = express();

app.listen(3000)

/* 라우트 메소드 */
// HTTP 메소드 중 하나로부터 파생되며, express 클래스의 인스턴스에 연결된다.

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.get('/', function (req, res) {
  res.send('POST request to the homepage')
})

/* 라우트 핸들러 */
// 여러 콜백 함수를 제공하여 요청을 처리할 수 있다.
// 라우트에 대한 사전 조건을 지정한 후, 현재의 라우트를 계속할 이유가 없는 경우에 제어를 후속 라우트에 전달할 수 있다.

// 하나의 콜백 함수는 하나의 라우트를 처리할 수 있다.
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})

// 2개 이상의 콜백 함수는 하나의 라우트를 처리할 수 있다.(next 오프젝트를 반드시 지정해야 한다.)
app.get('/example/b', function (req, res, next) {
  console.log('The response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

// 하나의 콜백 함수 배열은 하나의 라우트를 처리할 수 있다.
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// 독립적인 함수와 함수 배열의 조합은 하나의 라우트를 처리할 수 있다.
app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('The response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})

/* 모듈식 라우트 */
// 모듈식 라우트 app.route() 를 작성하면 중복성과 오탈자가 감소한다.
app.route('/book')
  .get(function (req, res){
    res.send('Get a random book')
  })
  .post(function (req, res){
    res.send('Add a random book')
  })
  .put(function (req, res){
    res.send('Update a random book')
  })

/*  express.Router 클래스를 사용하면 마운팅이 가능한 핸들러를 작성할 수 있다.
  1. 라우터를 모듈로 작성
  2. 라우터 모듈에서 미들웨어 함수를 로드 `export.module = router`
  3. 라우터 모듈 마운트
 */
var birds = require('./birds')
app.use('/birds', birds)
