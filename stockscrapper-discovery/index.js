const express = require('express');
const bodyParser=require('body-parser');

const app = express();

const port = 5000;

services = [];

app.use(bodyParser.json());

app.post('/discovery', function(request, response){
  var string = JSON.stringify(request.body);

  console.log('Got request: '+ string);

  let index = -1;
  var jsonObject = JSON.parse(string);

  for(var counter = 0; counter < services.length; counter++){
    var item = JSON.parse(services[counter]);
    if(item['mapping'] === jsonObject['mapping']){
      index = counter;
      break;
    }
  }

  jsonObject['timestamp'] = new Date();
  string = JSON.stringify(jsonObject);

  if(index === -1){
    services.push(string);
    response.send("Added Succesfully");
  }else {
    services[index] = string;
    response.send("Updated Successfully");
  }
});

app.get('/discovery/api/:type/:eventName', function(request, response){
  var status = false;

  for(var counter = 0; counter < services.length; counter++){
    var item = JSON.parse(services[counter]);

    if(item['mapping'] === '/api/' + request.params.type + '/' + request.params.eventName && item['status'] === 'ON'){
      status = true;
      break;
    }
  }

  if(status){
    response.send(item.host+':'+item.port+item.mapping);
  }else {
    response.send('Not Available');
  }
});

setInterval(() => {
  for(var counter = 0; counter < services.length; counter++){
    var item = JSON.parse(services[counter]);
    if(item['status'] === 'ON' && new Date() - new Date(item['timestamp']) > 1000){
      item['status'] = 'OFF';
      services[counter] = JSON.stringify(item);
      console.log('Clearing service: '+JSON.stringify(services[counter]));
    }
  }
}, 1000);

app.listen(port, function(){
  console.log('Discovery server started on port: '+port+' at '+new Date()+' hours.');
});
