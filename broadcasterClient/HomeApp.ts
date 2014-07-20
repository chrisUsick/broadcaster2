import App = require("Application")
import $ = require("jquery")
import C = require("collections")
class HomeApp extends App {
broadcastList: C.Dictionary<string, Element> = new C.Dictionary<string, Element>()
    constructor() {
        super()
        this.socket.on('updateBroadcast', (data) => {
            console.log("updateBroadcast", data)
            this.createPeerSnippet(data)
        })
        this.socket.on('deleteBroadcast', (broadcast) => {
            var li = this.broadcastList.remove(broadcast.peerId)
            
            $(li).remove()
            if (this.broadcastList.isEmpty()) $("#current").hide()
        })
    }
    run() {
        this.getBroadcastList()
    }
    getBroadcastList() {
        this.socket.emit("getBroadcastList", (list) => {
            if(list.length == 0) {
                $("#current").hide()
            }
            list.forEach((v, i) => {
                this.createPeerSnippet(v)
            })

        })
    }
    createPeerSnippet(data) {
        var ul = $("#broadcastList")
        console.log(this.broadcastList.containsKey(data.peerId)  )
        // FIX use if statement and if containKey(data.peerId) == true then remove the li from the ul
        var li = this.broadcastList.containsKey(data.peerId)  
            ? this.broadcastList.getValue(data.peerId)  
            : $("<li/>", {
            click: (e) => {
            } 
        })[0]
        $(li).append($("<p/>", { text: data.broadcastName }))
          .append($("<p/>", { text: data.description }))
            .append($('<img/>', { src: data.thumbnail }))
            .appendTo(ul)
        this.broadcastList.setValue(data.peerId, li)
        $("#current").show()
    }
} 

export = HomeApp