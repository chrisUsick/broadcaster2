import Greeter = require("Greeter")

module App {

    //no need for window.onload here because the dom will already be loaded when this is run
    export function run():void {
        var el = document.getElementById('content');
        var greeter = new Greeter(el);
        //console.log("greeter: ", greeter);
        greeter.start();
    }

}
export = App