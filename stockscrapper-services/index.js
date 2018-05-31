/*
  Get libraries
*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const requestHttp = require('request');

var events = require('./routes/events');

var app = express();

/*
  Setting variables
*/
var port = 3001;

app.use('/api', events);

setInterval(() => {
  var options = {
    uri: 'http://localhost:5000/discovery/',
    method: 'POST',
    json: true,
    body: { "service-name": "events",
	          "mapping": "/api/events/tickers",
	          "host": "127.0.0.1",
	          "status": "ON",
	          "port": "3000"
            }
  };
  requestHttp(options, () => {
    console.log('Pinged Discovery Server at '+new Date()+' hours.');
  });
} , 1000);

app.listen(port, function(){
  console.log('Events server started on port: '+port+' at '+new Date()+' hours.');
});
