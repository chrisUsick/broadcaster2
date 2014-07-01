//module Application {
//    interface Application {
//        run():void
//    }
//    export = Application
//} 
import io = require('socket.io-client')

class Application {
    socket:io.Socket
    run(): void { }
    constructor(serverHost: string) {
        this.socket=io.connect(serverHost)
    }
}
export = Application