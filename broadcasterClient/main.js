///<reference path="C:\DefinitelyTyped\requirejs\require.d.ts"/>
var path = location.pathname;
var app = path.match(/[\w]+/)[0].toLowerCase();

switch (app) {
    case 'broadcast':
        loadApp("BroadcastApp");
        break;
    case 'view':
        loadApp("ViewApp");
        break;
    default:
        break;
}
function loadApp(appName) {
    require([appName, 'jquery'], function (App) {
        'use strict';
        var app = new App();
        app.run();
    });
}
//# sourceMappingURL=main.js.map
