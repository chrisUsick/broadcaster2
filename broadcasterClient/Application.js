define(["require", "exports", 'socket.io-client'], function(require, exports, io) {
    var Application = (function () {
        /**
        * @serverHost the host of the server for socket.io connection
        */
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
