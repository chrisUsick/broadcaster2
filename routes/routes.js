function home(req, res) {
    res.render('home', { title: 'Express' });
}
exports.home = home;
;

function broadcast(req, res) {
    res.render("broadcast");
}
exports.broadcast = broadcast;
//# sourceMappingURL=routes.js.map
