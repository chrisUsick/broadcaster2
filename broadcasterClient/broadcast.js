define(["require", "exports"], function(require, exports) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var Broadcast = (function () {
        function Broadcast(parent) {
            var _this = this;
            this.parent = parent;
            this.video = document.createElement("video");
            this.parent.appendChild(this.video);
            this.getMedia(function () {
                _this.video.setAttribute('src', URL.createObjectURL(_this.stream));
            });
        }
        Broadcast.prototype.getMedia = function (callback) {
            var _this = this;
            navigator.getUserMedia({ audio: true, video: true }, function (stream) {
                _this.stream = stream;

                //console.log("get userMedia success callback");
                //console.log(URL.createObjectURL(stream))
                callback();
            }, function (err) {
                console.log(err);
            });
        };
        return Broadcast;
    })();
    
    return Broadcast;
});
//# sourceMappingURL=Broadcast.js.map
