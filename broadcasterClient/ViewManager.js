define(["require", "exports", "collections", "jquery"], function(require, exports, C, $) {
    var ViewManager = (function () {
        function ViewManager(selector) {
            var _this = this;
            this.views = new C.Dictionary();
            // @selector the selector for all divs which represent a separate view
            this.selector = selector;

            // add each div to dictionary
            var hash = location.hash != "" && location.hash != undefined ? location.hash.match(/#[\w]+/)[0] : "";
            $(this.selector).each(function (i, e) {
                var id = "#" + e.getAttribute("id");
                _this.views.setValue(id, e);

                // if there is a hash in the url
                //location.hash shouldn't be null but just to be safe keep it in condidtional
                if (hash != "" && hash != null) {
                    if (id == hash) {
                        _this.currentView = e;
                        $(e).show();
                    } else {
                        $(e).hide();
                    }
                    // if there isn't a hash
                } else {
                    if (i != 0) {
                        // hide all but the first view
                        $(e).hide();
                    }
                    if (i == 0) {
                        _this.currentView = e;
                        $(e).show();
                    }
                }
            });

            // on hashchange, navigate to corresponding view
            $(window).on("hashchange", function (e) {
                var hash = e.target.location.hash;

                // hide old view
                $(_this.currentView).hide();

                // set new view and show
                _this.currentView = _this.views.getValue(hash);
                $(_this.currentView).show();
            });
        }
        /**
        *@hashLoc the hash location to navigate to
        */
        ViewManager.prototype.navigateTo = function (hashLoc) {
            if (this.views.containsKey(hashLoc)) {
                var base = document.URL.split("#")[0];
                location.assign(base + hashLoc);
                console.log("navigating to: ", hashLoc);
            } else {
                return;
            }
        };
        return ViewManager;
    })();

    
    return ViewManager;
});
//# sourceMappingURL=ViewManager.js.map
