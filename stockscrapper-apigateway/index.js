/*
  Get libraries
*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

/*
  Setting variables
*/
var port = 3000;

/*
  Map client Folder for angular files
*/
app.use(express.static(__dirname + '/client'));

app.listen(port, function(){
  console.log('Index server started on port: '+port);
});
