module.exports = function savePost (post, cb) {
    setTimeout(function () {
      cb(null, ((Math.random() * 40000) >>> 0))
    }, 0)
  }
  