module.exports = function haltOnTimedout (req, res, next) {
    if (!req.timedout) {
      console.log('I in if !req.timedout')
      next()
    }
  }
  