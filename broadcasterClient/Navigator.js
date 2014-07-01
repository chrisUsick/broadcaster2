define(["require", "exports", "collections"], function(require, exports, C) {
    var ViewManager = (function () {
        function ViewManager(selector) {
            var _this = this;
            this.views = new C.Dictionary();
            // @selector the selector for all divs which represent a separate view
            this.selector = selector;

            // add each div to dictionary
            $(this.selector).each(function (i, e) {
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
        }
        return ViewManager;
    })();

    
    return ViewManager;
});
//# sourceMappingURL=Navigator.js.map
