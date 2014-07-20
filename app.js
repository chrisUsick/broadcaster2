var express = require('express');
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");
var socket = require('socket.io');
var C = require('./collections');
var config = require("./server-config");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
app.use(morgan({ format: 'dev', immediate: true }));
app.use(bodyParser());
app.use(methodOverride());

//app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'broadcasterClient')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.get('/', routes.home);
app.get('/broadcast', routes.broadcast);
app.get('/view', routes.view);

var server = http.createServer(app);
server.listen(parseInt(app.get('port')), config.ip, function () {
    console.log('Express server listening on port ' + app.get('port'));
});
var bcIDs = new C.Dictionary();
var io = socket.listen(server);
io.on("connection", function (socket) {
    socket.on("newBroadcast", function (metaData) {
        bcIDs.setValue(socket.id, metaData);
        io.sockets.emit('updateBroadcast', metaData);
        //socket.set("pID", pID)
    });
    socket.on("updateMetaData", function (data) {
        bcIDs.setValue(socket.id, data);
        io.sockets.emit("updateBroadcast", data);
    });
    socket.on("getBroadcastList", function (fn) {
        var pIDs = [];
        bcIDs.forEach(function (k, v) {
            pIDs.push(v);
        });
        fn(pIDs);
    });
    socket.on("disconnect", function () {
        console.log('socket disconnected', socket.id);
        if (bcIDs.containsKey(socket.id)) {
            io.sockets.emit("deleteBroadcast", bcIDs.getValue(socket.id));
            bcIDs.remove(socket.id);
        }
    });
});
//# sourceMappingURL=app.js.map
