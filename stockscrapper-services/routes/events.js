/*
  getting required modules.
*/
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();
var db;

/*
  Mongo configuration.
*/
const options = {
  poolSize: 10
};

/*
  Connect to mongodb and assign to global variable.
*/
mongoClient.connect('mongodb://localhost:27017/stockscrapper', options, (error, mongodb) => {
  if(error){
    console.log('DB is Unavailable: '+error);
    db=null;
  }else{
    db = mongodb;
  }
});

/*
  Handles get maaping for tickers.
*/
router.get('/events/tickers', function(request, response){
      if(db === null){
        console.log('DB is Unavailable: '+error);
        response.status(502).send({'status': 'DB is Unavailable'});
        return;
      }else{
        db.collection('equityTickers', function(error, collection){
          if(error){
            console.log('error in getting collection: '+error);
            response.status(500).send({'status': 'DB Collection is Unavailable'});
            return;
          }else{
            collection.find({}, {"_id": 0, "Security Id": 1, "Security Name": 1}).toArray(function(error, result){
              if(error){
                console.log('error in data: '+error);
                response.status(500).send({'status': 'DB Data is inconsistant'});
                return;
              }else{
                response.send(result);
                return;
              }
            });
          }
          return;
        });
      }
    });

module.exports = router;
