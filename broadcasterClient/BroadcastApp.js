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
            _super.call(this, '192.168.1.47');
            this.views = new VM("#main > div");
            this.peer = new PeerHandler({ host: "localhost", port: 9000 });
            this.chatRoom = new ChatRoom.ChatRoom($("#chatRoomContainer")[0]);
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
                _this.peer.addDataHandler(function (data, conn) {
                    if (data.from && data.msg) {
                        _this.chatRoom.addMessage(data);
                    }
                });

                //this.socket.emit("newBroadcast", )
                $("button", e.target).attr("disabled", "true");
            });
        };
        return BroadcastApp;
    })(App);

    
    return BroadcastApp;
});
//# sourceMappingURL=BroadcastApp.js.map
