define(["require", "exports", "peer", "collections"], function(require, exports, Peer, C) {
    var PeerHandler = (function () {
        /**
        * @settings settings to pass to the `peer` object
        * i.e. {host:"localhost",...}
        */
        function PeerHandler(settings, onOpenCb) {
            var _this = this;
            this.connections = new C.Dictionary();
            this.dataHandlers = [];
            this.peer = new Peer(settings);
            this.peer.on("open", function (id) {
                if (onOpenCb)
                    onOpenCb(id);
            });
            this.peer.on("connection", function (conn) {
                // easy way to access first connection, or let the user set the 'main Connection'
                console.log("peer connecting", conn.peer);
                _this.createConnection(conn);
            });
        }
        PeerHandler.prototype.addConnection = function (conn) {
            this.connections.setValue(conn.peer, conn);
        };
        PeerHandler.prototype.removeConnection = function (peerId) {
            this.connections.remove(peerId);
        };
        PeerHandler.prototype.createConnection = function (conn) {
            var _this = this;
            if (this.connections.isEmpty()) {
                this.mainConnection = conn;
            }
            conn.on("close", function () {
                _this.removeConnection(conn.peer);
            });

            conn.on("data", function (data) {
                _this.dataHandlers.forEach(function (cb, i) {
                    cb(data, conn);
                });
            });
            this.addConnection(conn);
            return conn;
        };
        PeerHandler.prototype.addDataHandler = function (dataHandler) {
            this.dataHandlers.push(dataHandler);
        };
        PeerHandler.prototype.getPeer = function () {
            return this.peer;
        };
        PeerHandler.prototype.addCallHandler = function (callHandler) {
            this.peer.on("call", function (call) {
                callHandler(call);
            });
        };
        PeerHandler.prototype.call = function (peerId, stream) {
            this.peer.call(peerId, stream);
        };
        PeerHandler.prototype.sendData = function (peerId, data) {
            var conn = this.peer.connect(peerId);
            this.createConnection(conn);
            conn.on("open", function () {
                conn.send(data);
            });
        };
        PeerHandler.prototype.getConnections = function () {
            return this.connections;
        };
        PeerHandler.prototype.getMainConnection = function () {
            return this.mainConnection;
        };
        PeerHandler.prototype.setMainConnection = function (conn) {
            this.mainConnection = conn;
        };
        return PeerHandler;
    })();

    
    return PeerHandler;
});
//# sourceMappingURL=PeerHandler.js.map
