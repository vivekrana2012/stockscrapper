var express = require('express');
var router = express.Router();

router.get('/events', function(req, res, next){
  res.send('Events API');
});

module.exports = router;
