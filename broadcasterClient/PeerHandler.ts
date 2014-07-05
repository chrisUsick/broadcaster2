import Peer = require("peer")
import C = require("collections")
class PeerHandler {
    private peer: PeerObject
    private mainConnection:string
    private connections: C.Dictionary<string, DataConnection> = new C.Dictionary<string, DataConnection>()
    private dataHandlers: Array<Function> = []
    /**
    * @settings settings to pass to the `peer` object
    * i.e. {host:"localhost",...}
    */
    constructor(settings: any, onOpenCb?: (id: string) => void) {
        this.peer = new Peer(settings)
        this.peer.on("open", (id) => {
            if (onOpenCb) onOpenCb(id)
        })
        this.peer.on("connection", (conn: DataConnection) => {
            // easy way to access first connection, or let the user set the 'main Connection'
            console.log("peer connecting", conn.peer)
            this.createConnection(conn)
        })
    }
    private addConnection(conn: DataConnection) {
        this.connections.setValue(conn.peer, conn)
    }
    private removeConnection(peerId:string) {
        this.connections.remove(peerId)
    }
    createConnection(conn: DataConnection) {
        //if (this.connections.isEmpty()) {
        //    this.mainConnection = conn
        //}
        conn.on("close", () => {
            this.removeConnection(conn.peer)
        })

        conn.on("data", (data: any) => {
            this.dataHandlers.forEach((cb, i) => {
                cb(data, conn)
            })
        })
        this.addConnection(conn)
        return conn
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
    /**
    * @makeMainConnection if true, set this connection be the `mainConnection`
    */
    sendData(peerId: string, data:any, makeMainConnection?:boolean) {
        if (makeMainConnection) {this.setMainConnection(peerId)}
        if (this.connections.containsKey(peerId)){
            var conn = this.connections.getValue(peerId)
            
            conn.send(data)
        } else {
            var conn = this.peer.connect(peerId)
            
            conn.on("open", () => {
                this.createConnection(conn)
                conn.send(data)
            })
        }
    }
    /**
    * send data to all connections
    */
    sendToAll(msg) {
        this.connections.forEach((pID, conn) => {
            this.sendData(pID, msg)
        })
    }
    getConnections() {
        return this.connections
    }
    getMainConnection(): DataConnection {
        return this.connections.getValue(this.mainConnection)
    }
    setMainConnection(pID:string): void {
        this.mainConnection = pID
    }
} 

export = PeerHandler