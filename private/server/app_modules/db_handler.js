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
var getProducts = function(res){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        getAllDocuments(db, res);
    });
}

var getAllDocuments = function(db, res){
    var configs = [];
    var cursor = db.collection('products').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        //console.log(doc);
        
        //add to array
        configs.push(doc);
      } else {
         db.close();
         res.send(JSON.stringify(configs));
      }
   });
}

module.exports.insertConfig = insertConfig;
module.exports.getProducts = getProducts;