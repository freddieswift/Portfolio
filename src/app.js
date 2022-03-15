const path = require('path')
const express = require('express')
const hbs = require('hbs')

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

app.get('', (req, res) => {
    res.render('index')
})

app.get('/blogs', (req, res) => {
    res.render('blogs')
})

app.get('/blogs/:slug', (req, res) => {
    res.send({ message: req.params.slug })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})