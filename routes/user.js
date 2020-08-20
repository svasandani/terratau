module.exports = function (app, Handlers, Middleware) {
    /*------------------------------------------------

    USER ROUTES

    ------------------------------------------------*/

    /*
    ACCEPT: nil

    RETURN:
    {
        "users": []User{
            "id": id,
            "name": name,
            "email": email,
            "roles": []Role{
                "type": role type,
                "resource_id": id of role resource
            }
        }
    }
    */
    app.get('/users', (req, res) => {
        return Handlers.User.getAllUsers(req, res);
    });

    /*
    ACCEPT: nil

    RETURN:
    User{
        "id": id,
        "name": name,
        "email": email,
        "roles": []Role{
            "type": role type,
            "resource_id": id of role resource
        }
    }
    */
    app.get('/user/:id', Middleware.assertIntID, (req, res) => {
        return Handlers.User.getUser(req, res);
    });
    /*
    ACCEPT:
    User{
        "id": id,
        "name": name,
        "email": email,
        "roles": []Role{
            "type": role type,
            "resource_id": id of role resource
        }
    }

    RETURN:
    User{
        "id": id,
        "name": name,
        "email": email,
        "roles": []Role{
            "type": role type,
            "resource_id": id of role resource
        }
    }
    */
    app.put('/user/:id', Middleware.assertIntID, (req, res) => {
        return Handlers.User.updateUser(req, res);
    });
    /*
    ACCEPT: nil

    RETURN:
    User{
        "id": id,
        "name": name,
        "email": email,
        "roles": []Role{
            "type": role type,
            "resource_id": id of role resource
        }
    }
    */
    app.delete('/user/:id', Middleware.assertIntID, (req, res) => {
        return Handlers.User.deleteUser(req, res);
    });

    app.get('/user/:id/roles', Middleware.assertIntID, (req, res) => {
        return res.send(`Get all roles of id=${req.params.id} user`);
    });

    app.get('/user/:id/role/:roleid', Middleware.assertIntID, (req, res) => {
        return res.send(`Get id=${req.params.roleid} role for id=${req.params.id} user`);
    });
    app.post('/user/:id/role/:roleid', Middleware.assertIntID, (req, res) => {
        return res.send(`Grant id=${req.params.roleid} role to id=${req.params.id} user`);
    });
    app.put('/user/:id/role/:roleid', Middleware.assertIntID, (req, res) => {
        return res.send(`Update id=${req.params.roleid} role for id=${req.params.id} user`);
    });
    app.delete('/user/:id/role/:roleid', Middleware.assertIntID, (req, res) => {
        return res.send(`Delete id=${req.params.roleid} role for id=${req.params.id} user`);
    });

    app.get('/user/:id/teams', (req, res) => {
        return res.send(`Get all teams of id=${req.params.id} user`);
    });

    app.get('/user/:id/team/:teamid', Middleware.assertIntID, (req, res) => {
        return res.send(`Get id=${req.params.teamid} team for id=${req.params.id} user`);
    });
    app.post('/user/:id/team/:teamid', Middleware.assertIntID, (req, res) => {
        return res.send(`Assign id=${req.params.teamid} user to id=${req.params.id} team`);
    });
    app.delete('/user/:id/team/:teamid', Middleware.assertIntID, (req, res) => {
        return res.send(`Remove id=${req.params.teamid} user from id=${req.params.id} team`);
    });
}