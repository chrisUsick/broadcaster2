define(["require", "exports", "peer", "collections"], function(require, exports, Peer, C) {
    var PeerHandler = (function () {
        /**
        * @settings settings to pass to the `peer` object
        * i.e. {host:"localhost",...}
        */
        function PeerHandler(settings, onOpenCb) {
            var _this = this;
            this.connection2s = [];
            this.connections = new C.Dictionary();
            this.dataHandlers = [];
            this.peer = new Peer(settings);
            this.peer.on("open", function (id) {
                if (onOpenCb)
                    onOpenCb(id);
            });
            this.peer.on("connection", function (conn) {
                _this.connections.setValue(conn.peer, conn);
                conn.on("close", function () {
                    _this.connections.remove(conn.peer);
                });
                conn.on("data", function (data) {
                    _this.dataHandlers.forEach(function (cb, i) {
                        cb(data, conn);
                    });
                });
            });
        }
        PeerHandler.prototype.addConnection = function (conn) {
            this.connections.setValue(conn.peer, conn);
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
            conn.on("open", function () {
                conn.send(data);
            });
        };
        return PeerHandler;
    })();

    
    return PeerHandler;
});
//# sourceMappingURL=PeerHandler.js.map
