define(["require", "exports", 'socket.io-client', "client-config"], function(require, exports, io, config) {
    var Application = (function () {
        /**
        * @serverHost the host of the server for socket.io connection
        */
        function Application() {
            this.socket = io.connect(config.ip);
        }
        Application.prototype.run = function () {
        };
        return Application;
    })();
    
    return Application;
});
//# sourceMappingURL=Application.js.map
