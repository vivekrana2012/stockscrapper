var express = require('express');
var requestHttp = require('request');
var router = express.Router();

router.get('/events', function(request, response, next){
  response.send('Events API');
});

router.get('/events/tickers', function(request, response){
  requestHttp('http://localhost:5000/discovery/api/events/tickers', {json:true}, (error, responseDiscovery, body) => {
    if(error){
      response.status(502).send({'status': 'discovery not found.'});
      return;
    }else{
      requestHttp('http://'+body, { json:true }, function(error, responseService, body){
        var result = [];
        if (error) {
          response.status(503).send({'status': 'Service not found.'});
          return;
        }else{
          body.forEach(function(item){
            result.push(item['Security Id']);
            response.send(result);
            return;
          });
        }
        response.status(500).send({'status': 'Oops! Something went wrong.'});
        return;
      });
    }
    response.status(500).send({'status': 'Oops! Something went wrong.'});
    return;
  });
  response.status(500).send({'status': 'Oops! Something went wrong.'});
  return;
});

module.exports = router;
