///<reference path="typings/peer.d.ts"/>

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

import Peer = require('peer')
import io = require("socket.io-client")

class Broadcast {
    video:HTMLVideoElement
    parent:Element
    stream: MediaStream
    peer: PeerObject
    userId: string
    socket: io.Socket
    metaData = {
        peerId: ''
        , broadcastName: ''
        , description: ''
    }
    messageHandlers: Array<(data:any) => void> = []
    constructor(parent:Element, metaData:any, socketRef:io.Socket){
        this.parent = parent
        this.metaData = metaData
        this.socket = socketRef
        this.video = document.createElement("video")
        this.video.setAttribute("muted","true")
        this.parent.appendChild(this.video)
        this.getMedia(() => {
            this.video.setAttribute('src', URL.createObjectURL(this.stream))
            this.video.play()
            this.initPeer()
        })
        
        
    }
    getMedia(callback:()=>void){
        navigator.getUserMedia({ audio: true, video: true }, 
        (stream:MediaStream) => {
            this.stream = stream
            //console.log("get userMedia success callback");
            //console.log(URL.createObjectURL(stream))
            callback()
        },
        (err) => {console.log(err)}
        )
    }
    initPeer() {
        this.peer = new Peer({ host: "localhost", port: 9000 })

        this.peer.on("open", (id) => {
            this.metaData.peerId = id
            this.socket.emit("newBroadcast", id, this.metaData)
        })
        this.peer.on("call", (call:MediaConnection) => {
            call.answer(this.stream)
        })
        this.peer.on("connection", (conn: DataConnection) => {
            conn.on('data', (data) => {
                if (data == 'metadata') {
                    conn.send(this.metaData)
                }
                else if (data == 'callMe') {
                    var call = this.peer.call(conn.peer, this.stream)

                } else {
                    this.messageHandlers.forEach((fn, i) => {
                        fn(data)
                    })
                }
            })
        })
    }
    /**
    * @callback is passed the message
    */
    addMessageHandler(callback: (data: any) => void) {
        this.messageHandlers.push(callback)
    }
} 
export = Broadcast