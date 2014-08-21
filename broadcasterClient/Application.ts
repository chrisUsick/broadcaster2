//module Application {
//    interface Application {
//        run():void
//    }
//    export = Application
//} 
import io = require('socket.io-client')
//import config = require("client-config")

class Application {
    socket:io.Socket
    run(): void { }
    /**
    * @serverHost the host of the server for socket.io connection
    */
    constructor() {
        this.socket=io.connect("127.0.0.1:1337")
    }
}
export = Application