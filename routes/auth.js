module.exports = function (app, Handlers, Middleware) {
    /*
    ACCEPT:
    {
        "auth_code": auth_code given by pukka
    }

    RETURN:
    {
        "token": jwt token
    }
    */
    app.post('/auth', (req, res) => {
        return Handlers.Auth.talkToPukka(req, res);
    });
}