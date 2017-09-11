/*
*   Web Server
*/
var _static = require('node-static');
var file = new _static.Server('./dist');
var server = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        //responde as requisições
        file.serve(request, response);    }).resume();
});
//socket.set('transports', [ 'websocket', 'xhr-polling' ]);
var request = require('request');
/*
*   Start Server
*/
ipaddress = process.env.OPENSHIFT_NODEJS_IP || 'moodle.net';
port      = process.env.OPENSHIFT_NODEJS_PORT || '4200';
console.log(port,ipaddress);
server.listen(port,ipaddress);
