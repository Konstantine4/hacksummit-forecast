var express = require('express');
var app = express();
var db_handler = require('./app_modules/db_handler');

/*********** Global Settings ************/
var port = 3000;
var apiBaseUrl = '/';

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var appendToLog =  function(data){
    console.log("appended something...");
    var fs = require('fs');
    var logStream = fs.createWriteStream('demo_store_log.txt', {'flags': 'a'});
    var date = new Date();
    logStream.end(date.getUTCHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ": " +data + " \r\n");
}

/* Demo store logs endpoint ********/
app.get(apiBaseUrl + 'getLog/', function (req, res) {
    fs = require('fs');
    fs.readFile('demo_store_log.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
      res.send(data);
    });
});

/* Demo notification endpoint ********/
app.post(apiBaseUrl + 'updatePrice/', function (req, res) {
    var receive_notification = function(products){
        console.log("Notification received: " + req.body.triggerCondition);
        switch(req.body.triggerCondition){
            case "snow":
                //for loop changes all prices to basePrice - variation
                for(var i = 0;i < products.length;i++){
                    db_handler.decreaseProductPrice(products[i]);
                }
                appendToLog("Decreasing prices");
                break;
            default:
                console.log("Unkown notification");
        }
        res.status(200).send("ok");
    }
    
    console.log('Receive post: ' +  JSON.stringify(req.body));
    db_handler.getProducts(receive_notification);
});

/* Get all products from database ********/
app.get(apiBaseUrl + 'getAllProducts/', function (req, res) {
    var returnProducts = function(products){
        var oldTime =  2*60;
        var current_time = Math.floor(Date.now() / 1000);
        for(var i = 0;i < products.length;i++){
            //check if time is old
            if(products[i].lastPriceUpdate < (current_time - oldTime)){
                console.log("Price changed");
                appendToLog("Prices back to normal");
                products[i].price = products[i].basePrice;
            }
        }
        
        res.send(JSON.stringify(products));
    }
    db_handler.getProducts(returnProducts);
});

/* Insert new user config on database ********/
app.post(apiBaseUrl + 'newConfig/', function (req, res) {
  res.send('POST Body: ' +  JSON.stringify(req.body));
  
  //for demo store
  if(req.body.endpoints[0] == "http://169.45.221.144:3000/updatePrice/"){
    console.log("demo store endpoint");
    db_handler.insertDemoEndpoint(req.body); 
  }else{
    console.log("NOT demo store endpoint");
    db_handler.insertConfig(req.body);
  }

});


/* Console print *****************************/
app.listen(port, function () {
  console.log('Example app listening on ' + port);
});