var express = require('express');
var router = express.Router();

/* api/auth/login */
router.post('/login', function (req, res) {
  return req.dataFacade.getData('auth', 'login', req.body.username, req.body.password)
    .then(session => {
      // TODO now set-cookie is not working
      // const DAYS_365 = 60 * 60 * 24 * 365 * 1000;
      // let incomingDomain = req.hostname;
      // let authCookieOpts = {
      //   httpOnly: true, secure: true, path: '/', maxAge: DAYS_365,
      //   domain: incomingDomain, encode: value => value // This is to prevent double quote be replaced with URI encoding
      // };
      // res.cookie(session.name, session.value, authCookieOpts)
      res.status(200).send(session);	// returning {} since consumer will expect json
    })
    .catch(error => {
      res.status(error.statusCode).json({
        error: error.message
      })
    })
})

module.exports = router;
