module.exports = function (app, Handlers, Middleware) {
    /*------------------------------------------------

    ROLE ROUTES

    ------------------------------------------------*/

    app.get('/roles', (req, res) => {
        return res.send(Handlers.Role.sayHi());
    });

    app.get('/role/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Get id=${req.params.id} role`);
    });
    app.post('/role/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Create id=${req.params.id} role`);
    });
    app.put('/role/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Update id=${req.params.id} role`);
    });
    app.delete('/role/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Delete id=${req.params.id} role`);
    });
}
