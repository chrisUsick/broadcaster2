/*
 * GET home page.
 */
import e = require('express');
//import config = require("../server-config")

export function home(req: e.Request, res: e.Response) {
    res.render('home', { title: 'Broadcaster'});
};

export function broadcast(req: e.Request, res: e.Response) {
    res.render("broadcast")
}

export function view(req, res) {
    res.render("view")
}