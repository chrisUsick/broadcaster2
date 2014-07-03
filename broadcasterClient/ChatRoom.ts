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
        $(this.newMsgForm).submit((e) => {
            // add message to your own feed
            e.preventDefault()
            var msg = { from: '', msg: '' }
            msg.from = this.chatName
            msg.msg = $("input", e.target).val()
            this.addMessage(msg)

            // send to broadcast peer
            this.peer.sendData(this.peer.getMainConnection().peer, msg)
        })

        //handle uploading messages
        this.peer.addDataHandler((data, conn) => {
            if (data.from && data.msg) {
                this.addMessage(data)
                }
        })
    }
    addMessage(msg: Message) {
        $("<li/>").append($("<span/>", { text: msg.from + ": ", class:"messageFrom"}))
            .append($("<span/>", { text: msg.msg, class: "messageContent" })).appendTo($(this.ul))
    }
    // do something when a message is added
    newMessageHandler(callback:(msg: Message) => void) {
        $(this.newMsgForm).submit((e) => {
            e.preventDefault()
            var msg = {from:'', msg:''}
            msg.from = this.chatName
            msg.msg = $("input", e.target).val()
            callback(msg)
        })
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