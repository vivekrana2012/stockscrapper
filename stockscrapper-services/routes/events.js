var express = require('express');
const mongoClient = require('mongodb').MongoClient;
var router = express.Router();

router.get('/events', function(req, res, next){
  res.send('Events API');
});

router.get('/events/tickers', function(request, response){
  mongoClient.connect('mongodb://localhost:27017/stockscrapper', function(error, db){
    if(error){
      console.log('error in getting db');
      return console.log(error);
    }else{
      db.collection('equityTickers', function(error, collection){
        if(error){
          db.close();
          console.log('error in getting db');
          return console.log(error);
        }else{
          collection.find({}, {"_id": 0, "Security Id": 1, "Security Name": 1}).toArray(function(error, result){
            if(error){
              db.close();
              console.log('error in data');
              return console.log(error);
            }else{
              db.close();
              response.send(result);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
