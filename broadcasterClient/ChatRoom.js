define(["require", "exports", "jquery"], function(require, exports, $) {
    var ChatRoom = (function () {
        /**
        *@elem the container of the chatRoom class
        */
        function ChatRoom(elem, peerRef, chatName) {
            var _this = this;
            this.ul = document.createElement("ul");
            this.newMsgForm = $("<form/>", { submit: function (e) {
                    e.preventDefault();
                } }).append($("<input/>", { type: "text", placeholder: "type to add a message" })).append($("<button/>", { type: "submit", text: "send" }))[0];
            this.newMessageHandlers = [];
            if (chatName) {
                this.chatName = chatName;
            }
            this.container = elem;
            this.peer = peerRef;
            $(this.container).append(this.ul);

            $(this.container).append(this.newMsgForm);

            // when a new message is added
            var self = this;
            $(self.newMsgForm).submit(function (e) {
                // add message to your own feed
                e.preventDefault();
                var msg = { from: '', msg: '' };
                msg.from = self.chatName;
                msg.msg = $("input", e.target).val();

                // clear the message input field
                $("input", e.target).val("");

                // send to broadcast peer
                if (self.peer.getMainConnection()) {
                    self.peer.sendData(self.peer.getMainConnection().peer, msg);
                } else {
                    // only add the message if this peer IS the main peer, i.e. this.peer.getMainConnection() is undefined
                    self.addMessage(msg);
                }
            });

            //handle uploading messages
            this.peer.addDataHandler(function (data, conn) {
                if (data.from && data.msg) {
                    _this.addMessage(data);
                }
            });
        }
        ChatRoom.prototype.addMessage = function (msg) {
            this.newMessageHandlers.forEach(function (cb, i) {
                cb(msg);
            });
            $("<li/>").append($("<span/>", { text: msg.from + ": ", class: "messageFrom" })).append($("<span/>", { text: msg.msg, class: "messageContent" })).prependTo($(this.ul));
        };

        // do something when a message is added
        ChatRoom.prototype.addNewMessageHandler = function (newMessageHandler) {
            //$(this.newMsgForm).submit((e) => {
            //    e.preventDefault()
            //    var msg = {from:'', msg:''}
            //    msg.from = this.chatName
            //    msg.msg = $("input", e.target).val()
            //    newMessageHandler(msg)
            //})
            this.newMessageHandlers.push(newMessageHandler);
        };

        /**
        * returns the old name
        */
        ChatRoom.prototype.setChatName = function (newName) {
            var oldname = this.chatName;
            this.chatName = newName;
            return oldname;
        };
        return ChatRoom;
    })();
    exports.ChatRoom = ChatRoom;
});
//export = ChatRoom
//# sourceMappingURL=ChatRoom.js.map
