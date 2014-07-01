///<reference path="typings/jquery.d.ts"/>
///<reference path="typings/socket.io-client.d.ts"/>
import App = require("Application")
import Greeter = require("Greeter")
import $ = require("jquery")
import Collections = require("collections")
import Broadcast = require("Broadcast")
import VM = require('ViewManager')
import ChatRoom = require("ChatRoom")

class BroadcastApp extends App {
    views: VM = new VM("#main > div")
    broadcast: Broadcast
    chatRoom = new ChatRoom.ChatRoom($("#chatRoomContainer")[0])
    constructor() {
        super('192.168.1.47')
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
                broadcastName: $("#ID", e.target).val()
                , description: $("#description", e.target).val()
            }
            this.broadcast = new Broadcast($("#video-container")[0], metaData, this.socket)

            //chatroom config
            this.chatRoom.setChatName(metaData.broadcastName)
            this.broadcast.addMessageHandler((data) => {
                if (data.from && data.msg) {
                    this.chatRoom.addMessage(data)
                }
            })
            //this.socket.emit("newBroadcast", )
            $("button", e.target).attr("disabled", "true")
        })
    }
}

export = BroadcastApp