///<reference path="typings/peer.d.ts"/>
define(["require", "exports"], function(require, exports) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var Broadcast = (function () {
        function Broadcast(parent, metaData, socketRef, peerRef) {
            var _this = this;
            this.capture = document.createElement("button");
            this.canvas = document.createElement("canvas");
            this.thumbnail = document.createElement("img");
            this.metaData = {
                peerId: '',
                broadcastName: '',
                description: '',
                thumbnail: ''
            };
            this.messageHandlers = [];
            this.parent = parent;
            this.metaData = metaData;
            this.socket = socketRef;
            this.peer = peerRef;
            this.video = document.createElement("video");
            this.video.setAttribute("muted", "true");
            this.parent.appendChild(this.video);
            this.capture.textContent = "capture your screen for a thumbnail";
            this.parent.appendChild(this.capture);
            this.thumbnail.setAttribute("width", "50");
            this.parent.appendChild(this.thumbnail);
            this.getMedia(function () {
                _this.video.setAttribute('src', URL.createObjectURL(_this.stream));
                _this.video.play();
                _this.initPeer();
                _this.capture.onclick = function () {
                    _this.setThumbnail();
                };
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
                this.socket.emit("newBroadcast", this.metaData);
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
        Broadcast.prototype.setThumbnail = function () {
            this.parent.appendChild(this.canvas);
            this.canvas.getContext("2d").drawImage(this.video, 0, 0, 50, 50);
            var img = this.canvas.toDataURL("image/png");
            this.thumbnail.src = img;
            this.metaData.thumbnail = img;
            this.socket.emit("updateMetaData", this.metaData);
        };
        return Broadcast;
    })();
    
    return Broadcast;
});
//# sourceMappingURL=Broadcast.js.map
