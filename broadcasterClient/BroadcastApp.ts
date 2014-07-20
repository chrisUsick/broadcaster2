///<reference path="typings/jquery.d.ts"/>
///<reference path="typings/socket.io-client.d.ts"/>
import App = require("Application")
import Greeter = require("Greeter")
import $ = require("jquery")
import Collections = require("collections")
import Broadcast = require("Broadcast")
import VM = require('ViewManager')
import ChatRoom = require("ChatRoom")
import PeerHandler = require("PeerHandler")

class BroadcastApp extends App {
    views: VM = new VM("#main > div")
    peer: PeerHandler = new PeerHandler({ host: "localhost", port: 9000 })
    broadcast: Broadcast
    chatRoom = new ChatRoom.ChatRoom($("#chatRoomContainer")[0], this.peer)
    messages: Array<ChatRoom.Message> = []
    constructor() {
        super()
        this.chatRoom.addNewMessageHandler((msg) => {
            this.peer.sendToAll(msg)
            this.messages.push(msg)
        })
        this.peer.addOnOpenHandler((conn) => {
            this.messages.forEach((msg, i) => {
                this.peer.sendData(conn.peer, msg)
            })
        })
    }
    run() {
        var g = new Greeter(document.getElementById('time'))
        g.start()
        this.formSubmit()
    }
    // make submit button in config form navigate to preview
    // and start get webcam
    formSubmit() {
        $("#config").submit((e) => {
            e.preventDefault();
            this.views.navigateTo("#preview")
            var metaData = {
                peerId: this.peer.getPeer().id
                , broadcastName: $("#ID", e.target).val()
                , description: $("#description", e.target).val()
            }
            this.broadcast = new Broadcast($("#video-container")[0], metaData, this.socket, this.peer)

            //chatroom config
            this.chatRoom.setChatName(metaData.broadcastName)
            //this.socket.emit("newBroadcast", )
            $("button", e.target).attr("disabled", "true")
        })
    }
}

export = BroadcastApp