const express = require('express')

const { check, validationResult } = require('express-validator')

const router = express.Router()

module.exports = params => {
  const { feedbackService } = params

  router.get('/', async (req, res, next) => {
    try {
      const feedback = await feedbackService.getList()
      const errors = req.session.feedback
        ? req.session.feedback.errors
        : false
      
      // After stored errors, reset the state
      req.session.feedback = {}

      return res.render('layout', { pageTitle: 'Feedback', template: 'feedback', feedback, errors })
    } catch (err) {
      return next(err)
    }
  })
  
  router.post('/', [
    check('name')
      .trim()
      .isLength({ min: 3 })
      .escape() // Exclude HTML and JS embedded code
      .withMessage('A name is required'),

    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .escape()
      .withMessage('A valid email address is required'),

    check('title')
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage('A title is required'),

    check('message')
      .trim()
      .isLength({ min: 5 })
      .escape()
      .withMessage('A message is required')
    ],
    (req, res) => {
      const errors = validationResult(req)

      if ( !errors.isEmpty() ) {
        req.session.feedback = {
          errors: errors.array()
        }
        return res.redirect('/feedback')
      }

      return res.send('Feedback from posted')
  })
  
  return router
}
