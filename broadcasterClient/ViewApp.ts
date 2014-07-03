
import App = require("Application")
import $ = require("jquery")
import VM = require("ViewManager")
import PeerHandler = require('PeerHandler')
import C = require('collections')

class ViewApp extends App {
    views: VM = new VM("#main > div")
    peer = new PeerHandler({ host: "localhost", port: 9000 })
    //peers: C.Dictionary<string, DataConnection> = new C.Dictionary<string,DataConnection>()
    videoElement: HTMLVideoElement
    constructor() {
        super("192.168.1.47")
        this.videoElement = document.createElement("video")
        $("#video-container").append(this.videoElement)

        this.peer.addCallHandler((call: MediaConnection) => {
            call.answer()
            call.on('stream', (stream) => {
                this.videoElement.setAttribute('src', URL.createObjectURL(stream))
                this.videoElement.play()
            })
        })
        
    }
    run() {
        this.getBroadcastList()
    }
    getBroadcastList() {
        this.socket.emit("getBroadcastList", (list: Array<string>) => {

            list.forEach((v, i) => {
                this.createPeerSnippet(v)
            })

        })
    }
    connectToBroadcast(pID: string) {
        // send request for the broadcast to call
        this.peer.sendData(pID, "callMe")

    }
    createPeerSnippet(data) {
        var ul = $("#broadcastList")
        $("<li/>", {
            click: (e) => {
                this.views.navigateTo("#watching")
                this.connectToBroadcast(data.peerId)
            }
        }).append($("<p/>", { text: data.broadcastName }))
          .append($("<p/>", { text: data.description }))
            .append($('<img/>', { src: '' }))
            .appendTo(ul)

    }
}
export = ViewApp
