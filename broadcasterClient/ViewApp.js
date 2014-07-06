var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Application", "jquery", "ViewManager", 'PeerHandler', 'collections', "ChatRoom"], function(require, exports, App, $, VM, PeerHandler, C, ChatRoom) {
    var ViewApp = (function (_super) {
        __extends(ViewApp, _super);
        function ViewApp() {
            var _this = this;
            _super.call(this, "192.168.1.47");
            this.views = new VM("#main > div");
            this.peer = new PeerHandler({ host: "localhost", port: 9000 });
            this.chatRoom = new ChatRoom.ChatRoom($("#chatRoomContainer")[0], this.peer, "anonomous");
            this.broadcastList = new C.Dictionary();
            this.videoElement = document.createElement("video");
            $("#video-container").append(this.videoElement);

            this.peer.addCallHandler(function (call) {
                call.answer();
                call.on('stream', function (stream) {
                    _this.videoElement.setAttribute('src', URL.createObjectURL(stream));
                    _this.videoElement.play();
                });
            });
            this.socket.on('updateBroadcast', function (data) {
                console.log("updateBroadcast", data);
                _this.createPeerSnippet(data);
            });
            this.socket.on('deleteBroadcast', function (broadcast) {
                var li = _this.broadcastList.getValue(broadcast.peerId);
                $(li).remove();
            });
        }
        ViewApp.prototype.run = function () {
            this.getBroadcastList();
        };
        ViewApp.prototype.getBroadcastList = function () {
            var _this = this;
            this.socket.emit("getBroadcastList", function (list) {
                list.forEach(function (v, i) {
                    _this.createPeerSnippet(v);
                });
            });
        };
        ViewApp.prototype.connectToBroadcast = function (pID) {
            // send request for the broadcast to call
            this.peer.sendData(pID, "callMe", true);
        };
        ViewApp.prototype.createPeerSnippet = function (data) {
            var _this = this;
            var ul = $("#broadcastList");
            var li = $("<li/>", {
                click: function (e) {
                    _this.views.navigateTo("#watching");
                    _this.connectToBroadcast(data.peerId);
                }
            }).append($("<p/>", { text: data.broadcastName })).append($("<p/>", { text: data.description })).append($('<img/>', { src: data.thumbnail })).appendTo(ul)[0];
            this.broadcastList.setValue(data.peerId, li);
        };
        return ViewApp;
    })(App);
    
    return ViewApp;
});
//# sourceMappingURL=ViewApp.js.map
