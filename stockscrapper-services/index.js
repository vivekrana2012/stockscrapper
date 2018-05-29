/*
  Get libraries
*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var events = require('./routes/events');

var app = express();

/*
  Setting variables
*/
var port = 3001;

app.use('/api', events);

app.listen(port, function(){
  console.log('Events server started on port: '+port);
});
