define(["require", "exports", "Greeter"], function(require, exports, Greeter) {
    var App;
    (function (App) {
        //no need for window.onload here because the dom will already be loaded when this is run
        function run() {
            var el = document.getElementById('content');
            var greeter = new Greeter(el);

            //console.log("greeter: ", greeter);
            greeter.start();
        }
        App.run = run;
    })(App || (App = {}));
    
    return App;
});
//# sourceMappingURL=app.js.map
