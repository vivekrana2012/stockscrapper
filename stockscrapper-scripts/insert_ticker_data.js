const csvFilePath='data/ListOfScrips.csv';
const csv=require('csvtojson');
const mongoClient = require('mongodb').MongoClient;

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  mongoClient.connect("mongodb://localhost:27017/stockscrapper", function(error, db){
    if(error){
      console.log("failed to connect to mongo");
      return console.log(error);
    }else{
      db.collection("equityTickers", function(error, collection){
        if(error){
          db.close();
          console.log("failed to find collection.");
          return console.log(error);
        }else{
          collection.insertMany(jsonObj, function(error, response){
            if(error){
              db.close();
              console.log("failed to insert data to collection.");
              return console.log(error);
            }else{
              console.log("Number of documents inserted: " + response.insertedCount);
              db.close();
              return console.log("Yay! Success");
            }
          });
        }
      });
    }
  });
});
