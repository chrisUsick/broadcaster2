define(["require", "exports", "jquery"], function(require, exports, $) {
    var ChatRoom = (function () {
        /**
        *@elem the container of the chatRoom class
        */
        function ChatRoom(elem, chatName) {
            this.ul = document.createElement("ul");
            this.newMsgForm = $("<form/>", { submit: function (e) {
                    e.preventDefault();
                } }).append($("<input/>", { type: "text", placeholder: "type to add a message" })).append($("<button/>", { type: "submit", text: "send" }))[0];
            if (chatName) {
                this.chatName = chatName;
            }
            this.container = elem;
            $(this.container).append(this.ul);

            $(this.container).append;
        }
        ChatRoom.prototype.addMessage = function (msg) {
            $("<li/>").append($("<span/>", { text: msg.from, class: "messageFrom" })).append($("<span/>", { text: msg.msg, class: "messageContent" }));
        };
        ChatRoom.prototype.onMessageAdd = function (callback) {
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
            return this.chatName = newName;
        };
        return ChatRoom;
    })();
    exports.ChatRoom = ChatRoom;
});
//export = ChatRoom
//# sourceMappingURL=ChatRoom.js.map
