var postJSONHttp = function (url, content, callback) {
    var request = require('request');
    request({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: content
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //body = JSON.parse(body);
            //callback(body);
            console.log("sent: " + content);
        } else {
            console.log("Got error: " + error);
            console.log("URL: " + url);
        }
    });
};

var getJSONHttp = function (url, callback) {
    var request = require("request");
    
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (/*error === false && || response.statusCode === 429*/ response.statusCode === 200 ) {
            //console.log(body.hourly.data[0]);
            callback(body);
        } else {
            console.log("Got error: " + error + "     url: " + url);
            console.log("Status:" + response.statusCode);
        }
    });
};

exports.getJSONHttp = getJSONHttp;
exports.postJSONHttp = postJSONHttp;