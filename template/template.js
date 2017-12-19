express = require('express')
app = express()

app.listen(3000)

// 내부적으로 모듈을 로드
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  // res.render() 함수에 의해 호출되어 템플릿 코드를 렌더링한다.
  res.render('index', {title: 'Hey', message: 'Hello there!'})
})