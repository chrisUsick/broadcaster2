var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Application", "Greeter", "jquery", "Broadcast", 'ViewManager', "ChatRoom", "PeerHandler"], function(require, exports, App, Greeter, $, Broadcast, VM, ChatRoom, PeerHandler) {
    var BroadcastApp = (function (_super) {
        __extends(BroadcastApp, _super);
        function BroadcastApp() {
            var _this = this;
            _super.call(this);
            this.views = new VM("#main > div");
            this.peer = new PeerHandler({ host: "localhost", port: 9000 });
            this.chatRoom = new ChatRoom.ChatRoom($("#chatRoomContainer")[0], this.peer);
            this.messages = [];
            this.chatRoom.addNewMessageHandler(function (msg) {
                _this.peer.sendToAll(msg);
                _this.messages.push(msg);
            });
            this.peer.addOnOpenHandler(function (conn) {
                _this.messages.forEach(function (msg, i) {
                    _this.peer.sendData(conn.peer, msg);
                });
            });
        }
        BroadcastApp.prototype.run = function () {
            var g = new Greeter(document.getElementById('time'));
            g.start();
            this.formSubmit();
        };

        // make submit button in config form navigate to preview
        // and start get webcam
        BroadcastApp.prototype.formSubmit = function () {
            var _this = this;
            $("#config").submit(function (e) {
                e.preventDefault();
                _this.views.navigateTo("#preview");
                var metaData = {
                    peerId: _this.peer.getPeer().id,
                    broadcastName: $("#ID", e.target).val(),
                    description: $("#description", e.target).val()
                };
                _this.broadcast = new Broadcast($("#video-container")[0], metaData, _this.socket, _this.peer);

                //chatroom config
                _this.chatRoom.setChatName(metaData.broadcastName);

                //this.socket.emit("newBroadcast", )
                $("button", e.target).attr("disabled", "true");
            });
        };
        return BroadcastApp;
    })(App);

    
    return BroadcastApp;
});
//# sourceMappingURL=BroadcastApp.js.map
