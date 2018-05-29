var express = require('express');
var requestHttp = require('request');
var router = express.Router();

router.get('/events', function(request, response, next){
  response.send('Events API');
});

router.get('/events/tickers', function(request, response){
  requestHttp('http://localhost:3001/api/events/tickers', { json:true }, function(error, responseHttp, body){
    var result = [];
    if (error) {
      console.log(error);
    }else{
      body.forEach(function(item){
        result.push(item['Security Id']);
      });
    }
    response.send(result);
  });
});

module.exports = router;
