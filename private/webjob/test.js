var weather = require('./app_modules/apis/weather');
var db_handler = require('./app_modules/db_handler');
var json_handler = require('./app_modules/json_handler');

function sendNotifications(notificationObject){
    //console.log(JSON.stringify(notificationObject));
    //console.log("Jojo");
    Object.keys(notificationObject).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
    for(var i = 0;i < notificationObject[key].endpoints.length;i++){
        //json_handler.postJSONHttp(notificationObject[key].endpoints[i],JSON.stringify(notificationObject[key]));
    }
});

}

function run(configs){
    //console.log("config list: " + JSON.stringify(configs[0]));
    for(var i = 0;i < configs.length;i++){
        switch(configs[i].config){
            case "forecast":
                weather.getForecast(configs[i], sendNotifications);
                break;
            default:
                console.log("Unknow config");
                break;
        }
    }
}

db_handler.getAllConfigs(run);   
//
