var express = require('express'),
    path = require('path'),
    compression = require('compression'),
    server = express(),
    options = {}, port, ipaddress;

// production only
if (server.get('env') === 'production') {
    // gzip compress all requests
    server.use(compression());

    options.maxAge = 365 * 24 * 60 * 60;
}

server.use(express.static(path.resolve(__dirname, './bin'), options));

port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

server.listen(port, ipaddress, function() {
    console.log('Express %s server listening on %s:%s', server.get('env'), ipaddress, port);
});
