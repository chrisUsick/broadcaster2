


// used in Peer.on mediaStream parameter
// http://peerjs.com/docs/#mediaconnection
interface MediaConnection {
    answer: (stream?: MediaStream[]) => void
    on: (event:string, callback:(stream:MediaStream)=>void)=>void
}
interface DataConnection {
    send: (data: any) => void
    peer: string
    on: (event:string, cb:(data:any)=>void)=>void
}
declare class Peer {
    public id: string
    //public 
    constructor(opts: Object)
    on(event: string, callback: (con: any) => void): void
    //on(event: string, callback: (mediaStream: MediaConnection) => void): void
    //on(event: string, callback: (dataConnection: DataConnection) => void): void
    connect(destPeerId: any): DataConnection
    call(destPeerId: any, mediaStream?:MediaStream):MediaConnection
}