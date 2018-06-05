/*
  getting required modules.
*/
const express = require('express');
const bodyParser = require('body-parser');
const requestHttp = require('request');
var events = require('./routes/events');

var app = express();

/*
  Setting port.
*/
var port = 3001;

/*
  redirect requests to the events module.
*/
app.use('/api', events);

/*
  Every 1000ms keep registering with the discovery server. If status is 400 no need to try again as data has failed validation.
*/
setInterval(() => {
  var options = {
    uri: 'http://localhost:5000/discovery/',
    method: 'POST',
    json: true,
    body: { "name": "tickers",
	          "mapping": "/api/events/tickers",
	          "host": "127.0.0.1",
	          "port": port
            }
  };
  requestHttp(options, (error, response, body) => {
    if(response && response.statusCode === 200){
      console.log('Successfully Pinged Discovery Server at '+new Date()+' hours.');
      console.log(response.body);
    }
    else if(response && response.statusCode === 400){
      console.log('Failed to register with discovery server: '+body);
    }else{
      console.log('Failed to register with discovery server: '+'due to server being down.');
    }
  });
} , 1000);

/*
  started server on port.
*/
app.listen(port, function(){
  console.log('Events server started on port: '+port+' at '+new Date()+' hours.');
});
