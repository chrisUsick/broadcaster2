var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Application", "Greeter", "jquery", "Broadcast", 'ViewManager', "ChatRoom"], function(require, exports, App, Greeter, $, Broadcast, VM, ChatRoom) {
    var BroadcastApp = (function (_super) {
        __extends(BroadcastApp, _super);
        function BroadcastApp() {
            _super.call(this, '192.168.1.47');
            this.views = new VM("#main > div");
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
                    broadcastName: $("#ID", e.target).val(),
                    description: $("#description", e.target).val()
                };
                _this.broadcast = new Broadcast($("#video-container")[0], metaData, _this.socket);

                //chatroom config
                _this.chatRoom.setChatName(metaData.broadcastName);
                _this.broadcast.addMessageHandler(function (data) {
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
