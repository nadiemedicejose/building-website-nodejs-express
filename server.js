const express = require('express')
const path = require('path')

const routes = require('./routes');

const app = express()

const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

// Use middleware to serve static files
app.use(express.static(path.join(__dirname, './static')))

// Middleware to listen for routes at root level
app.use('/', routes())

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`)
})
