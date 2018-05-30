const express = require('express');
const bodyParser=require('body-parser');

const app = express();

var port = 5000;

services = [];

app.use(bodyParser.urlencoded({extended: true}));

app.post('/discovery', function(request, response){
  services.push(request.body);
  response.send("Added Succesfully");
});

app.get('/discovery/api/:type/:eventName', function(request, response){
  console.log(services);
  services.forEach(function(item) {
    if(item['mapping'] === '/api/' + request.params.type + '/' + request.params.eventName && item['status'] === 'ON'){
      response.send(item.host+':'+item.port+'/'+item.mapping);
    }
  }, function(){
    response.send('Service is not up.');
  });
});

app.listen(port, function(){
  console.log('Discovery server started on port: '+port);
});
