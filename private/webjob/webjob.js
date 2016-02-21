var weather = require('./app_modules/apis/weather');
var db_handler = require('./app_modules/db_handler');
var json_handler = require('./app_modules/json_handler');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function sendNotifications(notificationObject){
    //console.log(JSON.stringify(notificationObject));
    //console.log("Jojo");
    var notification = null;
    Object.keys(notificationObject).forEach(function(key,index) {
        for(var i = 0;i < notificationObject[key].endpoints.length;i++){
            notification = JSON.parse(JSON.stringify(notificationObject[key]));
            delete notification.endpoints; 
            json_handler.postJSONHttp(notificationObject[key].endpoints[i],JSON.stringify(notification));
        }
    });
}

function getData(configs,i) {
    
            switch(configs[i].config){
                case "forecast":
                    weather.getForecast(configs[i], sendNotifications);
                    break;
                default:
                    console.log("Unknow config");
                    break;
            }
}



function run(configs){
    for(var i = 0;i < configs.length;i++){
        
        //print date
        //console.log("datetime " + i + ":" + (new Date()));
        
        //resquest data
        getData(configs,i);
        
    }
}




db_handler.getAllConfigs(run);