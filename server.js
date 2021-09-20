const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')

const FeedbackService = require('./services/FeedbackService')
const SpeakersService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakersService = new SpeakersService('./data/speakers.json')

const routes = require('./routes')

const app = express()

const port = 3000

// for servers that work with reverse-proxy like ngineX
app.set('trust proxy', 1)

// Middleware for session management
app.use(cookieSession({
  name: 'session',
  keys: ['ltijsfdñj5fs', 'dsfjkdsf45df'] // random keys
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

// Variables set during startup of app
app.locals.siteName = 'ROUX Meetups'

// Use middleware to serve static files
app.use(express.static(path.join(__dirname, './static')))

// Global template variables using middleware
app.use(async (req, res, next) => {
  /* res.locals.someVariable = 'hello'
  return next() */

  try {
    const names = await speakersService.getNames()
    res.locals.speakerNames = names
    console.log(res.locals)
  } catch (err) {
    return next(err)
  }
})

// Middleware to listen for routes at root level
app.use('/', routes({
  feedbackService,
  speakersService
}))

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`)
})
