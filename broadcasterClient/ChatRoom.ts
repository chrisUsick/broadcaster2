import Peer = require('peer')
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
        .append($("<button/>", { type: "submit", text:"send"}))[0]
    /**
    *@elem the container of the chatRoom class
    */
    constructor(elem: Element, chatName?: string) {
        if (chatName) { this.chatName = chatName }
        this.container = elem
        $(this.container).append(this.ul)
        
        $(this.container).append
    }
    addMessage(msg: Message) {
        $("<li/>").append($("<span/>", { text: msg.from, class:"messageFrom"}))
            .append($("<span/>", { text: msg.msg, class: "messageContent" }))
    }
    onMessageAdd(callback:(msg: Message) => void) {
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
        return this.chatName = newName
    }
}

//export = ChatRoom