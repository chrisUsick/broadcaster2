///<reference path="typings/peer.d.ts"/>

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//import Peer = require('peer')
import io = require("socket.io-client")
import PeerHandler = require("PeerHandler")

class Broadcast {
    video:HTMLVideoElement
    parent:Element
    capture:HTMLElement = document.createElement("button")
    canvas:HTMLCanvasElement = document.createElement("canvas")
    thumbnail:HTMLElement = document.createElement("image")
    stream: MediaStream
    peer: PeerHandler
    userId: string
    socket: io.Socket
    metaData = {
        peerId:''
        , broadcastName: ''
        , description: ''
        , thumbnail:''
    }
    messageHandlers: Array<(data:any) => void> = []
    constructor(parent:Element, metaData:any, socketRef:io.Socket, peerRef:PeerHandler){
        this.parent = parent
        this.metaData = metaData
        this.socket = socketRef
        this.peer = peerRef
        this.video = document.createElement("video")
        this.video.setAttribute("muted","true")
        this.parent.appendChild(this.video)
        this.capture.textContent = "capture your screen for a thumbnail"
        this.parent.appendChild(this.capture)
        this.thumbnail.setAttribute("width","50")
        this.parent.appendChild(this.thumbnail)
        this.getMedia(() => {
            this.video.setAttribute('src', URL.createObjectURL(this.stream))
            this.video.play()
            this.initPeer()
            this.capture.onclick = () => {this.setThumbnail()}
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

        if (!this.peer.getPeer().disconnected) {
            this.socket.emit("newBroadcast", this.metaData)
        }
        this.peer.addCallHandler((call:MediaConnection) => {
            call.answer(this.stream)
        })
        this.peer.addDataHandler((data, conn) => {
            if (data == 'callMe') {
                var call = this.peer.call(conn.peer, this.stream)
            }
        })
    }
    setThumbnail() {
        this.parent.appendChild(this.canvas)
        this.canvas.getContext("2d").drawImage(this.video, 0, 0, 50,50)
        var img = this.canvas.toDataURL("image/png")
        this.thumbnail.src = img
        this.metaData.thumbnail = img
        this.socket.emit("updateMetaData", this.metaData)


    }
} 
export = Broadcast