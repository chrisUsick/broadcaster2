import Peer = require("peer")
import C = require("collections")
class PeerHandler {
    private peer: PeerObject
    private connection2s: Array<DataConnection> = []
    private connections: C.Dictionary<string, DataConnection> = new C.Dictionary<string, DataConnection>()
    private dataHandlers: Array<Function> = []
    /**
    * @settings settings to pass to the `peer` object
    * i.e. {host:"localhost",...}
    */
    constructor(settings: any, onOpenCb?: (id:string)=>void) {
        this.peer = new Peer(settings)
        this.peer.on("open", (id) => {
            if (onOpenCb) onOpenCb(id)
        })
        this.peer.on("connection", (conn: DataConnection) => {
            this.connections.setValue(conn.peer, conn)
            conn.on("close", () => {
                this.connections.remove(conn.peer)
            })
            conn.on("data", (data: any) => {
                this.dataHandlers.forEach((cb, i) => {
                    cb(data, conn)
                })
            })
        })
    }
    private addConnection(conn: DataConnection) {
        this.connections.setValue(conn.peer, conn)
    }
    addDataHandler(dataHandler: (data: any, conn:DataConnection) => void) {
        this.dataHandlers.push(dataHandler)
    }
    getPeer(): PeerObject {
        return this.peer
    }
    addCallHandler(callHandler: (call: MediaConnection) => void) {
        this.peer.on("call", (call: MediaConnection) => {
            callHandler(call)
        })
    }
    call(peerId: string, stream: MediaStream) {
        this.peer.call(peerId, stream)
    }
    sendData(peerId: string, data:any) {
        var conn = this.peer.connect(peerId)
        conn.on("open", () => {
            conn.send(data)
        })
    }
} 

export = PeerHandler