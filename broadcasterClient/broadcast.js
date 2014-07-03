///<reference path="typings/peer.d.ts"/>
define(["require", "exports"], function(require, exports) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var Broadcast = (function () {
        function Broadcast(parent, metaData, socketRef, peerRef) {
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
            this.peer = peerRef;
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
            if (!this.peer.getPeer().disconnected) {
                this.socket.emit("newBroadcast", this.peer.getPeer().id, this.metaData);
            }
            this.peer.addCallHandler(function (call) {
                call.answer(_this.stream);
            });
            this.peer.addDataHandler(function (data, conn) {
                if (data == 'callMe') {
                    var call = _this.peer.call(conn.peer, _this.stream);
                }
            });
        };
        return Broadcast;
    })();
    
    return Broadcast;
});
//# sourceMappingURL=Broadcast.js.map
