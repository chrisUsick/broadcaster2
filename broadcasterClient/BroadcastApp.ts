///<reference path="typings/jquery.d.ts"/>

import App = require("Application")
import Greeter = require("Greeter")
import $ = require("jquery")
import Collections = require("collections")
import Broadcast = require("Broadcast")

class BroadcastApp implements App {
    currentView: Element = null
    views: Collections.Dictionary<string, Element> = new Collections.Dictionary<string, Element>()
    broadcast:Broadcast

    constructor() {
    }
    run() {
        var g = new Greeter(document.getElementById('time'))
        g.start()
        
        this.configNavigation()
        this.formSubmit()
    }
    // set initial view, add event handlers for hashchange
    configNavigation() {
        // add views to dictionary
        $("#main > div").each((i, e) => {
            this.views.setValue(e.getAttribute("id"), e)
            if (i!=0) {
                // hide all but the first view
                $(e).hide()
            }
            if(i==0){
                this.currentView = e
                $(e).show()
            }
        })
        // on hashchange, navigate to corresponding view
        $(window).on("hashchange", (e) => {
            var hash = e.target.location.hash.replace("#", '')
            // hide old view
            $(this.currentView).hide()
            // set new view and show
            this.currentView = this.views.getValue(hash)
            $(this.currentView).show()

        })
    }
    // make submit button in config form navigate to preview
    // and start get webcam
    formSubmit() {
        $("#config").submit((e) => {
            e.preventDefault();
            var base = document.URL.split("#")[0]
            location.assign(base + "#preview")
            this.broadcast = new Broadcast($("#video-container")[0])
            $("button", e.target).attr("disabled", "true")
        })
    }
}

export = BroadcastApp