var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://backend2:abc123@ds055885.mongolab.com:55885/hacksummit';

var appendToLog =  function(data){
    console.log("appended something...");
    var fs = require('fs');
    var logStream = fs.createWriteStream('demo_store_log.txt', {'flags': 'a'});
    var date = new Date();
    logStream.end(date.getUTCHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ": " +data + " \r\n");
}

/* Insert on Database ****************************************/
var insertConfig = function(config) {
    MongoClient.connect(url, function(err, db) {
        //console.log("config: " + config);
        assert.equal(null, err);
        insertDocument(db, config, function() {
            db.close();
        });
    });
}

var insertDocument = function(db, config, callback) {
    db.collection('configs').insertOne( config, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document!!!");
        callback();
  });
}

/* Get alL products from Database ****************************************/
var getProducts = function(callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        getAllDocuments(db, callback);
    });
}

var getAllDocuments = function(db, callback){
    var products = [];
    var cursor = db.collection('products').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        //add to array
        products.push(doc);
      } else {
         db.close();
         callback(products);
      }
   });
}

/* Decrease Products Prices ****************************************/
var decreaseProductPrice = function(product){
    var ObjectId = require('mongodb').ObjectID;
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        
        //console.log("Connection opened");
        console.log("New Price: " + product.basePrice*(1-product.priceVariation));
        var newPrice = product.basePrice*(1-product.priceVariation);
        db.collection('products').updateOne(
            {
                "_id": new ObjectId(product._id)
            },
            {
                $set: { "price": newPrice, "lastPriceUpdate" : Math.floor(Date.now() / 1000)}
            }, function(err, results) {
                db.close();
            }
        );

    });
}

/* Decrease Products Prices ****************************************/
var insertDemoEndpoint = function(config){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connection opened");
        db.collection('configs').updateOne(
            {
                //look for demo store endpoint
                "endpoints": [
                    "http://169.45.221.144:3000/updatePrice/"
                ]
            },
            {
                //set new triggers
                $set: { 
                    "weatherCondition": [ config.weatherCondition[0] ],
                    "lat": config.lat,
                    "lon": config.lon,
                    "notificationTime": config.notificationTime,
                    "predictionTime": config.predictionTime
                }
            }, function(err, results) {
                console.log("results: " + results);
                //console.log("nModified: " + JSON.parse(results).nModified);
                //console.log("n: " + JSON.parse(results).n);
                
                //if nModified = 0, then nothing was modified
                if(JSON.parse(results).nModified === 0){
                    console.log("No changes made");
                    //the problem is that, if it didn't do anything, it's possible that the query returned nothing
                        //that's why we check 'n'

                    if(JSON.parse(results).n === 0){
                        //if n is equal 0, query returned nothing, need to insert on db
                        console.log("Inserting on database...");
                        insertConfig(config);
                        appendToLog("New configuration in the store");
                    }else{
                        //if n is different than 0, query found and updated file, nothing else to do
                        console.log("Demo store endpoint config received is equal the one in db, nothing changed");
                        appendToLog("Demo store received new configuration, but it's identical the last one");
                    }
                    
                }else{
                    //if nModified = 1, then something was updated
                    console.log("Updated demo store endpoint");
                    appendToLog("Updated demo store configuration");
                }
                db.close();
            }
        );

    });
}

module.exports.insertConfig = insertConfig;
module.exports.getProducts = getProducts;
module.exports.decreaseProductPrice = decreaseProductPrice;
module.exports.insertDemoEndpoint = insertDemoEndpoint;