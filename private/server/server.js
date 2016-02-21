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
        var oldTime =  1*60;
        var current_time = Math.floor(Date.now() / 1000);
        for(var i = 0;i < products.length;i++){
            console.log("join my loop nigga: " + current_time);
            //check if time is old
            if(products[i].lastPriceUpdate < (current_time - oldTime)){
                console.log("Price changed")
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
  db_handler.insertConfig(req.body);
  res.status(200).send("ok");
});


/* Console print *****************************/
app.listen(port, function () {
  console.log('Example app listening on ' + port);
});