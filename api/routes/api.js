var express = require('express');
var router = express.Router();

/* GET api list */
router.get('/', function (req, res) {
  return res.json(req.config.getEndpoints())
});

router.use('/auth', require('./auth'));
router.use('/issue', require('./issue'));
router.use('/sprint', require('./sprint'));

module.exports = router;
