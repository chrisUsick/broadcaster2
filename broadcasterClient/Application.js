define(["require", "exports", 'socket.io-client'], function(require, exports, io) {
    var Application = (function () {
        function Application(serverHost) {
            this.socket = io.connect(serverHost);
        }
        Application.prototype.run = function () {
        };
        return Application;
    })();
    
    return Application;
});
//# sourceMappingURL=Application.js.map
