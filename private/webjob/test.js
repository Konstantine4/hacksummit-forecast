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
    Object.keys(notificationObject).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
        for(var i = 0;i < notificationObject[key].endpoints.length;i++){
            //json_handler.postJSONHttp(notificationObject[key].endpoints[i],JSON.stringify(notificationObject[key]));
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
        console.log("datetime " + i + ":" + (new Date()));
        
        //resquest data
        getData(configs,i);
        
        //wait
        var start = new Date().getTime();
        for (var j = 0; j < 1e7; j++) {
            if ((new Date().getTime() - start) > 10000){
                break;
            }
        }
        
        
        
    }
}




db_handler.getAllConfigs(run);