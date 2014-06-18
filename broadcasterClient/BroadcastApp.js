///<reference path="typings/jquery.d.ts"/>
define(["require", "exports", "Greeter", "jquery", "collections", "Broadcast"], function(require, exports, Greeter, $, Collections, Broadcast) {
    var BroadcastApp = (function () {
        function BroadcastApp() {
            this.currentView = null;
            this.views = new Collections.Dictionary();
        }
        BroadcastApp.prototype.run = function () {
            var g = new Greeter(document.getElementById('time'));
            g.start();

            this.configNavigation();
            this.formSubmit();
        };

        // set initial view, add event handlers for hashchange
        BroadcastApp.prototype.configNavigation = function () {
            var _this = this;
            // add views to dictionary
            $("#main > div").each(function (i, e) {
                _this.views.setValue(e.getAttribute("id"), e);
                if (i != 0) {
                    // hide all but the first view
                    $(e).hide();
                }
                if (i == 0) {
                    _this.currentView = e;
                    $(e).show();
                }
            });

            // on hashchange, navigate to corresponding view
            $(window).on("hashchange", function (e) {
                var hash = e.target.location.hash.replace("#", '');

                // hide old view
                $(_this.currentView).hide();

                // set new view and show
                _this.currentView = _this.views.getValue(hash);
                $(_this.currentView).show();
            });
        };

        // make submit button in config form navigate to preview
        // and start get webcam
        BroadcastApp.prototype.formSubmit = function () {
            var _this = this;
            $("#config").submit(function (e) {
                e.preventDefault();
                var base = document.URL.split("#")[0];
                location.assign(base + "#preview");
                _this.broadcast = new Broadcast($("#video-container")[0]);
                $("button", e.target).attr("disabled", "true");
            });
        };
        return BroadcastApp;
    })();

    
    return BroadcastApp;
});
//# sourceMappingURL=BroadcastApp.js.map
