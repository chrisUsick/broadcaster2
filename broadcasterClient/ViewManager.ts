import C = require("collections")
import $ = require("jquery")

class ViewManager {
    private selector: string
    private views: C.Dictionary<string, Element> = new C.Dictionary<string, Element>()
    private currentView:Element
    
    constructor(selector: string) {
        // @selector the selector for all divs which represent a separate view

        this.selector = selector
        // add each div to dictionary
        var hash = location.hash
        $(this.selector).each((i, e) => {
            var id = "#" + e.getAttribute("id")
            this.views.setValue(id, e)
            // if there is a hash in the url
            //location.hash shouldn't be null but just to be safe keep it in condidtional
            if (hash != "" && hash != null) {
                if (id == hash) {
                    this.currentView = e
                    $(e).show()
                } else {
                    $(e).hide()
                }
            // if there isn't a hash
            } else {
                if (i != 0) {
                    // hide all but the first view
                    $(e).hide()
                }
                if (i == 0) {
                    this.currentView = e
                    $(e).show()
                }
            }
        })


        // on hashchange, navigate to corresponding view
        $(window).on("hashchange", (e) => {
            var hash = e.target.location.hash
            // hide old view
            $(this.currentView).hide()
            // set new view and show
            this.currentView = this.views.getValue(hash)
            $(this.currentView).show()

        })
    }
    /**
    *@hashLoc the hash location to navigate to
    */
    navigateTo(hashLoc: string): void {
        if (this.views.containsKey(hashLoc)) {
            var base = document.URL.split("#")[0]
            location.assign(base + hashLoc)
            console.log("navigating to: ", hashLoc)
        } else {
            return;
        }
    }
}

export = ViewManager 