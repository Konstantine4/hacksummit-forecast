var json_handler = require('./../json_handler');

var urlForLocation = 'http://api.openweathermap.org/data/2.5/forecast?mode=json&appid=5f9440d2f7303c861a5360fef42d8e25'; // add params lat and lon

var treatForecast = function(body, config, callback){
    var current_timestamp = Math.floor(Date.now() /1000);
    var notificationObject = {};
    var found = false;
    /*
        This for loop goes over each of the predictions available on the API 
        to see if any of the users notification should be sent
    */
    //console.log("Start checkin: " + body.list.length);
    for(var i = 0;i < body.list.length && !found;i++){
        /*
            If the target timestamp is higher than the prediction time, then the program shouldn't check any more 
            predictions for this user
        */
        if((current_timestamp + config.predictionTime) < body.list[i].dt){
            console.log("time " + (current_timestamp + config.predictionTime) + " over limit: " + body.list[i].dt);
            found = true;
        }else{
            /*
                This for loop check if one of the predictions meets any of the notifications of the user
            */
            found = false;
            for(var j = 0;j < config.weatherCondition.length;j++){
                if(body.list[i].weather[0].id == config.weatherCondition[j] && !found){
                    //add to notification object
                    var notification = {};
                    notification.endpoints = config.endpoints;
                    notification.triggerCondition = config.weatherCondition[j];
                    notification.conditionGroup = body.list[i].weather[0].main;
                    notification.description = body.list[i].weather[0].description;
                    notification.message = "It is going to " + body.list[i].weather[0].main + " in the next " + 
                        (config.predictionTime/3600) + " hours";
                    notificationObject[config.userId+';'+config.weatherCondition[j]] = notification;
                    
                    //leave loop
                    found = true;
                    
                    //test print 
                    console.log("Prediction " + body.list[i].dt + ": MEETS condition " + 
                        config.weatherCondition[j]);
                    
                }
                
                //Test print 
                else{
                    console.log("Prediction " + body.list[i].dt + ": Doens't meet condition " + 
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
        json_handler.getJSONHttp(urlForLocation + '&lat=' + config.lat + '&lon=' + config.lon, function(json) {
            treatForecast(json, config, callback);
        });
        
    }else{
        console.log("timestamp error...sorry turo :P");
    }
    
}

exports.getForecast = getForecast;