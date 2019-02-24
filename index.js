const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const ageMiddleware = (req, res, next) => {
  if (req.query.age) return next()
  return res.redirect('/desafio')
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const users = ['Diego Fernandes', 'Robson Marques', 'Douglas Andrade']

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/desafio', (req, res) => {
  return res.render('desafio')
})

app.get('/major', ageMiddleware, (req, res) => {
  return res.render('major', {
    resultado: `Você é maior de idade e possui ${req.query.age} anos`
  })
})

app.get('/minor', ageMiddleware, (req, res) => {
  return res.render('minor', {
    resultado: `Você é menor de idade e possui ${req.query.age} anos`
  })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) return res.redirect(`/major?age=${req.body.age}`)
  else return res.redirect(`/minor?age=${req.body.age}`)
})

app.listen(3000)
