module.exports = function (app, Handlers, Middleware) {
    /*------------------------------------------------

    TEAM ROUTES

    ------------------------------------------------*/

    app.get('/teams', (req, res) => {
        return res.send(Handlers.Team.sayHi());
    });

    app.get('/team/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Get id=${req.params.id} team`);
    });
    app.post('/team/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Create id=${req.params.id} team`);
    });
    app.put('/team/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Update id=${req.params.id} team`);
    });
    app.delete('/team/:id', Middleware.assertIntID, (req, res) => {
        return res.send(`Delete id=${req.params.id} team`);
    });
}
