///<reference path="C:\DefinitelyTyped\requirejs\require.d.ts"/>
var path = location.pathname
var appPath = path.match(/[\w]+/g)
if (appPath) {
    var app = appPath[appPath.length - 1].toLowerCase()
    switch (app) {
    case 'broadcast':
        loadApp("BroadcastApp")
        break
    case 'view':
        loadApp("ViewApp")
        break
    default:
        break
    }
} else {
    loadApp("HomeApp")
}

function loadApp(appName: string) {
    require([appName, 'jquery'], (App) => {
        'use strict';
        var app = new App();
        app.run();
    })
}