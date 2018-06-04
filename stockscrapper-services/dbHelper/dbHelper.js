/*
  getting required modules.
*/
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/stockscrapper';

let db=null;

module.exports = function(){
  MongoClient.connect(url, {poolSize: 10}, (error, mongodb) => {
    if(!error)  db = mongodb;
  });
  return db;
};
