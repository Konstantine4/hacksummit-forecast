//var postJSONHttp = function (url, content, callback) {
    
var getJSONHttp = function (url, callback) {
    var request = require("request");
    
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        
        if (!error && response.statusCode === 200) {
            callback(body);
        } else {
            console.log("Got error: " + error);
        }
    })
}

exports.getJSONHttp = getJSONHttp;
//exports.postJSONHttp = postJSONHttp;