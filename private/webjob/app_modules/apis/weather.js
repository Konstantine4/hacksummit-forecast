var json_handler = require('./../json_handler');

var urlForLocation = 'https://api.forecast.io/forecast/5d607dc4bbbf6f6bcc68920ebc316f83/'; // add lat and lon

var treatForecast = function(body, config, callback){
    var current_timestamp = Math.floor(Date.now() /1000);
    var notificationObject = {};
    var found = false;
    /*
        This for loop goes over each of the predictions available on the API 
        to see if any of the users notification should be sent
    */
    //console.log("Start checkin: " + body.list.length);
    console.log("c: " + body.hourly.data.length);
    for(var i = 0;i < body.hourly.data.length && !found;i++){
        /*
            If the target timestamp is higher than the prediction time, then the program shouldn't check any more 
            predictions for this user
        */
        if((current_timestamp + config.predictionTime) < body.hourly.data[i].time){
            console.log("time " + (current_timestamp + config.predictionTime) + " over limit: " + 
                body.hourly.data[i].time);
            found = true;
        }else{
            /*
                This for loop check if one of the predictions meets any of the notifications of the user
            */
            found = false;
            //console.log("c: " + config.weatherCondition.length);
            for(var j = 0;j < config.weatherCondition.length;j++){
                if(body.hourly.data[i].icon == config.weatherCondition[j] && !found){
                    //add to notification object
                    var notification = {};
                    notification.endpoints = config.endpoints;
                    notification.triggerCondition = config.weatherCondition[j];
                    notification.conditionGroup = body.hourly.data[i].summary;
                    notification.message = "It is going to " + config.weatherCondition[j] + " in the next " + 
                        (config.predictionTime/3600) + " hours";
                    notificationObject[config.userId+';'+config.weatherCondition[j]] = notification;
                    
                    //leave loop
                    found = true;
                    
                    //test print 
                    console.log("Prediction " + body.hourly.data[i].time + ": MEETS condition " + 
                        config.weatherCondition[j]);
                    
                }
                
                //Test print 
                else{
                    console.log("Prediction " + body.hourly.data[i].time + ": Doens't meet condition " + 
                        config.weatherCondition[j]);
                }
            }
        }
        
    }
    
    if(found === false){
        console.log("timestamp not found...sorry turo :P *2");
    }
    
    //send notifications
    callback(notificationObject);
}




var getForecast = function (config, callback) {
    var current_ts = Math.floor(Date.now() / 1000);
    if(config.predictionTime > 0 && config.predictionTime < 432000){
        //console.log(urlForLocation + '&lat=' + config.lat + '&lon=' + config.lon);
        //console.log("datetime2 " + (new Date()));
        console.log(urlForLocation + config.lat + "," + config.lon);
        json_handler.getJSONHttp(urlForLocation + config.lat + "," + config.lon, function(json) {
            treatForecast(json, config, callback);
        });
        
    }else{
        console.log("timestamp error...sorry turo :P");
    }
    
}

exports.getForecast = getForecast;