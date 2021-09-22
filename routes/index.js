const express = require('express')

const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

const router = express.Router()

module.exports = params => {
  const { speakersService } = params

  router.get('/', async (req, res, next) => {
    try {
      const topSpeakers = await speakersService.getList()
      const artwork = await speakersService.getAllArtwork()
      return res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, artwork })
    } catch (err) {
      return next(err)
    }
  })

  router.use('/speakers', speakersRoute(params))
  router.use('/feedback', feedbackRoute(params))
  
  return router
}
