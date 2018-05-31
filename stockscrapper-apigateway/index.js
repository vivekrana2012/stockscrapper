/*
  Get libraries
*/
var express = require('express');

var router = require('./routes/events');

var app = express();

/*
  Setting variables
*/
var port = 3000;

/*
  Map client Folder for angular files
*/
app.use(express.static(__dirname + '/client'));
app.use('/api', router);

app.listen(port, function(){
  console.log('Index server started on port: '+port);
});
