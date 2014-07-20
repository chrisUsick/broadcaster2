define(["require", "exports", 'socket.io-client'], function(require, exports, io) {
    //import config = require("client-config")
    var Application = (function () {
        /**
        * @serverHost the host of the server for socket.io connection
        */
        function Application() {
            this.socket = io.connect(window.serverIP);
        }
        Application.prototype.run = function () {
        };
        return Application;
    })();
    
    return Application;
});
//# sourceMappingURL=Application.js.map
