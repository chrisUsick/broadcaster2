import PeerHandler = require('PeerHandler')
import $ = require("jquery")

export interface Message {
    from: string
    msg:string
}
export class ChatRoom {
    chatName:string
    container: Element
    ul: Element = document.createElement("ul")
    newMsgForm: Element = $("<form/>", { submit: (e) => { e.preventDefault() }})
        .append($("<input/>", { type: "text", placeholder: "type to add a message" }))
        .append($("<button/>", { type: "submit", text: "send" }))[0]
    peer:PeerHandler
    newMessageHandlers: Array<(msg:Message) => void> = []
    /**
    *@elem the container of the chatRoom class
    */
    constructor(elem: Element, peerRef:PeerHandler, chatName?: string) {
        if (chatName) { this.chatName = chatName }
        this.container = elem
        this.peer = peerRef
        $(this.container).append(this.ul)
        
        $(this.container).append(this.newMsgForm)
        // when a new message is added

        var self = this
        $(self.newMsgForm).submit((e) => {
            // add message to your own feed
            e.preventDefault()
            var msg = { from: '', msg: '' }
            msg.from = self.chatName
            msg.msg = $("input", e.target).val()
            

            // send to broadcast peer
            if(self.peer.getMainConnection()) {
                self.peer.sendData(self.peer.getMainConnection().peer, msg)
            } else {
                // only add the message if this peer IS the main peer, i.e. this.peer.getMainConnection() is undefined
                self.addMessage(msg)
            }
        })

        //handle uploading messages
        this.peer.addDataHandler((data, conn) => {
            if (data.from && data.msg) {
                this.addMessage(data)
                }
        })
    }
    addMessage(msg: Message) {
        this.newMessageHandlers.forEach((cb, i) => {
            cb(msg)
        })
        $("<li/>").append($("<span/>", { text: msg.from + ": ", class:"messageFrom"}))
            .append($("<span/>", { text: msg.msg, class: "messageContent" })).prependTo($(this.ul))
    }
    // do something when a message is added
    addNewMessageHandler(newMessageHandler:(msg: Message) => void) {
        //$(this.newMsgForm).submit((e) => {
        //    e.preventDefault()
        //    var msg = {from:'', msg:''}
        //    msg.from = this.chatName
        //    msg.msg = $("input", e.target).val()
        //    newMessageHandler(msg)
        //})
        this.newMessageHandlers.push(newMessageHandler)
    }
    /**
    * returns the old name
    */
    setChatName(newName: string): string {
        var oldname = this.chatName
        this.chatName = newName
        return oldname
    }
}

//export = ChatRoom