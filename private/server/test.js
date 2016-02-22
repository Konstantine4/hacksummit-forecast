var fs = require('fs');
var logStream = fs.createWriteStream('demo_store_log.txt', {'flags': 'a'});
logStream.end("this is the end line \r\n");
// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
//logStream.write('Initial line...');
