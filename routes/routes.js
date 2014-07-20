var config = require("../server-config");

function home(req, res) {
    res.render('home', { title: 'Broadcaster', config: config });
}
exports.home = home;
;

function broadcast(req, res) {
    res.render("broadcast", { config: config });
}
exports.broadcast = broadcast;

function view(req, res) {
    res.render("view", { config: config });
}
exports.view = view;
//# sourceMappingURL=routes.js.map
