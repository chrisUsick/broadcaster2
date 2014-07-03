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
            if (chatName) {
                this.chatName = chatName;
            }
            this.container = elem;
            this.peer = peerRef;
            $(this.container).append(this.ul);

            $(this.container).append(this.newMsgForm);

            // when a new message is added
            $(this.newMsgForm).submit(function (e) {
                // add message to your own feed
                e.preventDefault();
                var msg = { from: '', msg: '' };
                msg.from = _this.chatName;
                msg.msg = $("input", e.target).val();
                _this.addMessage(msg);

                // send to broadcast peer
                _this.peer.sendData(_this.peer.getMainConnection().peer, msg);
            });

            //handle uploading messages
            this.peer.addDataHandler(function (data, conn) {
                if (data.from && data.msg) {
                    _this.addMessage(data);
                }
            });
        }
        ChatRoom.prototype.addMessage = function (msg) {
            $("<li/>").append($("<span/>", { text: msg.from + ": ", class: "messageFrom" })).append($("<span/>", { text: msg.msg, class: "messageContent" })).appendTo($(this.ul));
        };

        // do something when a message is added
        ChatRoom.prototype.newMessageHandler = function (callback) {
            var _this = this;
            $(this.newMsgForm).submit(function (e) {
                e.preventDefault();
                var msg = { from: '', msg: '' };
                msg.from = _this.chatName;
                msg.msg = $("input", e.target).val();
                callback(msg);
            });
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
