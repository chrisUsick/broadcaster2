var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Application", "jquery", "collections"], function(require, exports, App, $, C) {
    var HomeApp = (function (_super) {
        __extends(HomeApp, _super);
        function HomeApp() {
            var _this = this;
            _super.call(this);
            this.broadcastList = new C.Dictionary();
            this.socket.on('updateBroadcast', function (data) {
                console.log("updateBroadcast", data);
                _this.createPeerSnippet(data);
            });
            this.socket.on('deleteBroadcast', function (broadcast) {
                var li = _this.broadcastList.remove(broadcast.peerId);

                $(li).remove();
                if (_this.broadcastList.isEmpty())
                    $("#current").hide();
            });
        }
        HomeApp.prototype.run = function () {
            this.getBroadcastList();
        };
        HomeApp.prototype.getBroadcastList = function () {
            var _this = this;
            this.socket.emit("getBroadcastList", function (list) {
                if (list.length == 0) {
                    $("#current").hide();
                }
                list.forEach(function (v, i) {
                    _this.createPeerSnippet(v);
                });
            });
        };
        HomeApp.prototype.createPeerSnippet = function (data) {
            var ul = $("#broadcastList");
            console.log(this.broadcastList.containsKey(data.peerId));

            // FIX use if statement and if containKey(data.peerId) == true then remove the li from the ul
            var li = this.broadcastList.containsKey(data.peerId) ? this.broadcastList.getValue(data.peerId) : $("<li/>", {
                click: function (e) {
                }
            })[0];
            $(li).append($("<p/>", { text: data.broadcastName })).append($("<p/>", { text: data.description })).append($('<img/>', { src: data.thumbnail })).appendTo(ul);
            this.broadcastList.setValue(data.peerId, li);
            $("#current").show();
        };
        return HomeApp;
    })(App);

    
    return HomeApp;
});
//# sourceMappingURL=HomeApp.js.map
