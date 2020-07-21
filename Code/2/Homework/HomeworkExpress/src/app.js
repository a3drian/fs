const express = require("express");
const { env } = require("./env");

const path = require('path');

const { homeRouter } = require('./routes/home');

const { GETRouter } = require('./routes/get');
const { POSTRouter } = require('./routes/post');
const { PUTRouter } = require('./routes/put');
const { DELETERouter } = require('./routes/delete');

module.exports.makeApp = makeApp;

let app;

function makeApp() {
    if (app) return app;

    app = express();

    // pentru .css
    app.use(express.static(path.join(__dirname, 'public')));

    // routes
    app.use(env.HOME_ROUTE, homeRouter);

    // primele callbacks din pipeline dupa homeRouter
    app.use(env.GET_ROUTE, GETRouter);
    app.use(env.POST_ROUTE, POSTRouter);
    app.use(env.PUT_ROUTE, PUTRouter);
    app.use(env.DELETE_ROUTE, DELETERouter);

    // 404
    // al treilea din pipeline
    // un raspuns generic de eroare 404
    // se creeaza obiectul de eroare si se trimite urmatorului middleware
    app.use((_req, _res, next) => {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
    });

    // 500
    // este practic un error handler, pentru ca are 'err' ca prim parametru
    // unde 'err' este un obiect de tip eroare
    // se observa diferenta intre antetul celui de al treilea middleware, ala cu 404:
    // app.use((_req, _res, next) vs. app.use((err, _req, res, _next)
    app.use((err, _req, res, _next) => {
        res.status(err.status || 500)
            .send(env.NODE_ENV === "development" ? err : {}); // daca suntem in 'development', printam in browser, altfel un obiect de eroare gol
    });

    // dupa 500 nu se mai intampla nimic, asta e ultimul middleware
    // ultimul callback din pipeline

    return app;
}