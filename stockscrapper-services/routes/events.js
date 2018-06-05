/*
  getting required modules.
*/
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const router = express.Router();
const client = new mongoClient();
var db;

/*
  Event to check for mongo status changes, if type is 'Unknown' start trying again.
*/
client.on('serverDescriptionChanged', function(event) {
  // console.log('received serverDescriptionChanged: '+ event['newDescription']['type']);
  if(event['newDescription']['type'] === 'Unknown'){
    console.log('DB just went down.');
  }else{
    console.log('DB is Working fine.');
  }
});

/*
  Mongo configuration.
*/
const options = {
  poolSize: 10,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  bufferMaxEntries: 5
};

/*
  Connection interval for initial connection after which the reconnectTries will take care.
  Minimum interval is 2000, for 1000 mongo opens multiple connections.
*/
var connection = setInterval(connectWithMongo, 2000);

/*
  Connect to mongodb and assign to global variable.
*/
function connectWithMongo(){
    client.connect('mongodb://localhost:27017/stockscrapper', options, (error, mongodb) => {
      if(error){
        console.log('DB is Unavailable: '+error);
        db=null;
      }else{
        db = mongodb;
        clearInterval(connection);
      }
    });
}

/*
  Handles get maping for tickers.
*/
router.get('/events/tickers', function(request, response){
      if(db === null){
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
