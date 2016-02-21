var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://backend2:abc123@ds055885.mongolab.com:55885/hacksummit';

/*****************Insert User's Config*******************/
var insertConfig = function(config) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, config, function() {
            db.close();
        });
    });
};


var insertDocument = function(db, config, callback) {
    db.collection('configs').insertOne(config, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document!!!");
        callback();
  });
};


/*****************Get All Configs*******************/
var getAllConfigs = function(callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        getAllDocuments(db, callback);
    });
}

var getAllDocuments = function(db, callback){
    var configs = [];
    var cursor = db.collection('configs').find();
    cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        //console.log(doc);
        
        //add to array
        configs.push(doc);
      } else {
         db.close();
         callback(configs);
      }
   });
}

/*****************Export Functions*******************/
module.exports.insertConfig = insertConfig;
module.exports.getAllConfigs = getAllConfigs;