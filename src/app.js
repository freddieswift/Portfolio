const path = require('path')
const express = require('express')
const hbs = require('hbs')

const getContentHelper = require('./utils/getContent')
const getGist = require('./utils/getGist')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirPath))
app.use(express.json())

app.get('', (req, res) => {
    res.render('index')
})

app.get('/blog', (req, res) => {
    res.render('blog')
})

app.get('/blog/:slug', (req, res) => {
    res.render('article', { slug: req.params.slug })
})

app.post('/getData', (req, res) => {
    const params = req.body
    const url = 'http://localhost:1337/api/articles?'
    getContentHelper(params, url, (article) => {
        res.send(article)
    })
})

app.post('/getGist', (req, res) => {
    const gistURL = req.body.gistURL
    getGist(gistURL, (response) => {
        res.send({ div: response })
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})