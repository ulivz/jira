var express = require('express');
var router = express.Router();

/* api/issue/:id */
router.get('/:id', function (req, res) {
  return req.dataFacade.getData('issue', 'getIssueData', req.params.id)
    .then(data => res.json(data))
    .catch(error => {
      res.status(error.statusCode)
      return res.json({
        error: error.message
      })
    })
})

module.exports = router
