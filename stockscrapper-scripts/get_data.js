const request = require('request');
const mongoClient = require('mongodb').MongoClient;

request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TCS&outputsize=full&apikey=FMTKCMIBSVTDZ8N3', { json: true }, (err, res, body) => {
  if(err){
    console.log("failed to contact alphavantage.");
    return console.log(err);
  }else{
    mongoClient.connect("mongodb://localhost:27017/stock_data", function(error, db){
      if(error){
        console.log("failed to connect to mongo");
        return console.log(error);
      }else{
        db.collection("tcs", function(error, collection){
          if(error){
            console.log("failed to get collection");
            return console.log(error);
          }else{
            
          }
        }
      });
    });
  }
});
