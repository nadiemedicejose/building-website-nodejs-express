const express = require('express')

const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

const router = express.Router()

module.exports = params => {
  router.get('/', (req, res) => {

    /* // Prove session with Private Browser
    if( !req.session.visitcout ) {
      req.session.visitcout = 0
    }
    req.session.visitcout += 1
    console.log(`Number of visits: ${req.session.visitcout}`) */

    res.render('pages/index', { pageTitle: 'Welcome' })
  })

  router.use('/speakers', speakersRoute(params))
  router.use('/feedback', feedbackRoute(params))
  
  return router
}
