var express = require('express');
var router = express.Router();

// greatWall: 2128
// dragonBoat: 1066

/* api/sprint/current/:teamid */
router.get('/current/:teamid', function (req, res) {
  return req.dataFacade.getData('sprint', 'getCurrentSprint', req.params.teamid)
    .then(data => res.json(data))
    .catch(error => {
      res.status(error.statusCode)
      return res.json({
        error: error.message
      })
    })
})


/* api/sprint/:teamid */
router.get('/:teamid', function (req, res) {
  return req.dataFacade.getData('sprint', 'getTeamSprints', req.params.teamid)
    .then(data => res.json(data))
    .catch(error => {
      console.log(error)
      res.status(error.statusCode)
      return res.json({
        error: error.message
      })
    })
})

module.exports = router
