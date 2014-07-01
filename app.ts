import express = require('express');
import routes = require('./routes/routes');
import http = require('http');
import path = require('path');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import methodOverride = require("method-override");
import errorHandler = require("errorhandler");
import socket = require('socket.io');
import C = require('./collections')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon());
app.use(morgan({ format: 'dev', immediate: true }));
app.use(bodyParser());
app.use(methodOverride());

import stylus = require('stylus');
//app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'broadcasterClient')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.get('/', routes.home);
app.get('/broadcast', routes.broadcast);
app.get('/view', routes.view)



var server: http.Server = http.createServer(app)
server.listen(parseInt(app.get('port')), "192.168.1.47", function () {
    console.log('Express server listening on port ' + app.get('port'));
});
var bcIDs: C.Dictionary<string, any> = new C.Dictionary<string, any>()
var io = socket.listen(server)
io.on("connection", (socket:socket.Socket) => {
    socket.on("newBroadcast", (pID, metaData) => {
        bcIDs.setValue(pID, metaData)
        //socket.set("pID", pID)
    })
    socket.on("getBroadcastList", (fn) => {
        var pIDs = new Array<string>()
        bcIDs.forEach((k, v) => {
            pIDs.push(v)
        })
        fn(pIDs)
    })
    socket.on("disconnect", () => {
        console.log('socket disconnected', socket.id)
    })
})