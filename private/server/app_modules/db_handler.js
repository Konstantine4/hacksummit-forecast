var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://backend2:abc123@ds055885.mongolab.com:55885/hacksummit';

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
                //console.log(results);
                db.close();
                console.log("OF COURSE ITS COPY PASTE TURO!!!");
            }
        );

    });
}

module.exports.insertConfig = insertConfig;
module.exports.getProducts = getProducts;
module.exports.decreaseProductPrice = decreaseProductPrice;