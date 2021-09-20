const express = require('express')
const path = require('path')

const FeedbackService = require('./services/FeedbackService')
const SpeakersService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakersService = new SpeakersService('./data/speakers.json')

const routes = require('./routes')

const app = express()

const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

// Use middleware to serve static files
app.use(express.static(path.join(__dirname, './static')))

// Middleware to listen for routes at root level
app.use('/', routes({
  feedbackService,
  speakersService
}))

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`)
})
