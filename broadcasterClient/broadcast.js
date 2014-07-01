///<reference path="typings/peer.d.ts"/>
define(["require", "exports", 'peer'], function(require, exports, Peer) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var Broadcast = (function () {
        function Broadcast(parent, metaData, socketRef) {
            var _this = this;
            this.metaData = {
                peerId: '',
                broadcastName: '',
                description: ''
            };
            this.messageHandlers = [];
            this.parent = parent;
            this.metaData = metaData;
            this.socket = socketRef;
            this.video = document.createElement("video");
            this.video.setAttribute("muted", "true");
            this.parent.appendChild(this.video);
            this.getMedia(function () {
                _this.video.setAttribute('src', URL.createObjectURL(_this.stream));
                _this.video.play();
                _this.initPeer();
            });
        }
        Broadcast.prototype.getMedia = function (callback) {
            var _this = this;
            navigator.getUserMedia({ audio: true, video: true }, function (stream) {
                _this.stream = stream;

                //console.log("get userMedia success callback");
                //console.log(URL.createObjectURL(stream))
                callback();
            }, function (err) {
                console.log(err);
            });
        };
        Broadcast.prototype.initPeer = function () {
            var _this = this;
            this.peer = new Peer({ host: "localhost", port: 9000 });

            this.peer.on("open", function (id) {
                _this.metaData.peerId = id;
                _this.socket.emit("newBroadcast", id, _this.metaData);
            });
            this.peer.on("call", function (call) {
                call.answer(_this.stream);
            });
            this.peer.on("connection", function (conn) {
                conn.on('data', function (data) {
                    if (data == 'metadata') {
                        conn.send(_this.metaData);
                    } else if (data == 'callMe') {
                        var call = _this.peer.call(conn.peer, _this.stream);
                    } else {
                        _this.messageHandlers.forEach(function (fn, i) {
                            fn(data);
                        });
                    }
                });
            });
        };

        /**
        * @callback is passed the message
        */
        Broadcast.prototype.addMessageHandler = function (callback) {
            this.messageHandlers.push(callback);
        };
        return Broadcast;
    })();
    
    return Broadcast;
});
//# sourceMappingURL=Broadcast.js.map
