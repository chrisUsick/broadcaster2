


// used in Peer.on mediaStream parameter
// http://peerjs.com/docs/#mediaconnection
//interface MediaConnection {
//    answer: (stream?: MediaStream[]) => void
//    on: (event:string, callback:(stream:MediaStream)=>void)=>void
//}
//interface DataConnection {
//    send: (data: any) => void
//    peer: string
//    on: (event:string, cb:(data:any)=>void)=>void
//}
//declare class Peer {
//    public id: string
//    //public 
//    constructor(opts: Object)
//    on(event: string, callback: (con: any) => void): void
//    //on(event: string, callback: (mediaStream: MediaConnection) => void): void
//    //on(event: string, callback: (dataConnection: DataConnection) => void): void
//    connect(destPeerId: any): DataConnection
//    call(destPeerId: any, mediaStream?:MediaStream):MediaConnection
//}

interface DataConnection {
    send(data: any): void;
    close(): void;
    on(event: string, callback: (p?: any) => void): void;
    bufferSize: number;
    dataChannel: Object;
    label: string;
    metadata: any;
    open: boolean;
    peerConnection: Object;
    peer: string;
    reliable: boolean;
    serialization: string;
    type: string;
}

interface MediaConnection {
    answer(stream?: any): void;
    close(): void;
    on(event: string, callback: (p?: any) => void): void;
    open: boolean;
    metadata: any;
    peer: string;
    type: string;
}

interface ConnectOptions {
    label?: string;
    metadata?: any;
    serialization?: string;
    reliable?: boolean;
}

interface PeerObject {
    connect(id: string, options?: ConnectOptions): DataConnection;
    call(id: string, stream: any): MediaConnection;
    on(event: string, callback: (p?: any) => void): void;
    disconnect(): void;
    destroy(): void;
    id: string;
    connections: Object;
    disconnected: boolean;
    destroyed: boolean;
}

interface PeerOptions {
    key?: string;
    host?: string;
    port?: number;
    path?: string;
    secure?: boolean;
    config?: Object;
    debug?: number;
}

interface PeerStatic {
    new (id: string, options: PeerOptions): PeerObject;
    new (options: PeerOptions): PeerObject;
}

interface SupportsData {
    audioVideo: boolean;
    data: boolean;
    binary: boolean;
    reliable: boolean;
}

interface UtilStatic {
    browser: string;
    supports: SupportsData;
}

declare module "peer" {
    export = Peer
}

declare var Peer: PeerStatic;
declare var util: UtilStatic;