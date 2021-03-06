﻿///<reference path="C:\DefinitelyTyped\requirejs\require.d.ts"/>
var path = location.pathname;
var appPath = path.match(/[\w]+/g);
console.log(appPath);
if (appPath) {
    var app = appPath[appPath.length - 1].toLowerCase();
    switch (app) {
        case 'broadcast':
            loadApp("BroadcastApp");
            break;
        case 'view':
            loadApp("ViewApp");
            break;
        default:
            loadApp("HomeApp");
            break;
    }
} else {
    loadApp("HomeApp");
}

function loadApp(appName) {
    require([appName, 'jquery'], function (App) {
        'use strict';
        var app = new App();
        app.run();
    });
}
//# sourceMappingURL=main.js.map
