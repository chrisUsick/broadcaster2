//import config = require("../server-config")
function home(req, res) {
    res.render('home', { title: 'Broadcaster' });
}
exports.home = home;
;

function broadcast(req, res) {
    res.render("broadcast");
}
exports.broadcast = broadcast;

function view(req, res) {
    res.render("view");
}
exports.view = view;
//# sourceMappingURL=routes.js.map
