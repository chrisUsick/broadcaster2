
import App = require("Application")
import $ = require("jquery")
import VM = require("ViewManager")
import PeerHandler = require('PeerHandler')
import C = require('collections')
import ChatRoom = require("ChatRoom")

class ViewApp extends App {
    views: VM = new VM("#main > div")
    peer = new PeerHandler({ host: "localhost", port: 9000 })
    //peers: C.Dictionary<string, DataConnection> = new C.Dictionary<string,DataConnection>()
    videoElement: HTMLVideoElement
    chatRoom: ChatRoom.ChatRoom = new ChatRoom.ChatRoom($("#chatRoomContainer")[0], this.peer, "anonomous")
    broadcastList: C.Dictionary<string, Element> = new C.Dictionary<string, Element>()
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
        this.socket.on('updateBroadcast', (data) => {
            console.log("updateBroadcast", data)
            this.createPeerSnippet(data)
        })
        this.socket.on('deleteBroadcast', (broadcast) => {
            var li = this.broadcastList.getValue(broadcast.peerId)
            $(li).remove()
        })
    }
    run() {
        this.getBroadcastList()
    }
    getBroadcastList() {
        this.socket.emit("getBroadcastList", (list) => {

            list.forEach((v, i) => {
                this.createPeerSnippet(v)
            })

        })
    }
    connectToBroadcast(pID: string) {
        // send request for the broadcast to call
        this.peer.sendData(pID, "callMe", true)

    }
    createPeerSnippet(data) {
        var ul = $("#broadcastList")
        var li = this.broadcastList.containsKey(data.peerId)  
            ? this.broadcastList.getValue(data.peerId)  
            : $("<li/>", {
            click: (e) => {
                this.views.navigateTo("#watching")
                this.connectToBroadcast(data.peerId)
            } 
        })[0]
        $(li).append($("<p/>", { text: data.broadcastName }))
          .append($("<p/>", { text: data.description }))
            .append($('<img/>', { src: data.thumbnail }))
            .appendTo(ul)
        this.broadcastList.setValue(data.peerId, li)
    }
}
export = ViewApp
