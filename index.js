const Handlers = require('./handlers/handlers.js');

var express = require('express');
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fairly common operation, so we extract it to middleware
function assertIntID(req, res, next) {
    if (isNaN(req.params.id) || (req.params.roleid && isNaN(req.params.roleid)) || (req.params.teamid && isNaN(req.params.teamid))) {
        res.status(400).send("ID should be an integer.");
    } else {
        next();
    }
}

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

// all following actions require auth, so we check for auth
app.use((req, res, next) => {
    let jwt = req.header('Authorization');

    if (jwt == null || jwt == '') {
        res.status(403).send(`No JWT provided.`)
    } else {
        // TODO: restrict all endpoints except GET to admin
        next();
    }
});

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
app.get('/user/:id', assertIntID, (req, res) => {
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
app.put('/user/:id', assertIntID, (req, res) => {
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
app.delete('/user/:id', assertIntID, (req, res) => {
    return Handlers.User.deleteUser(req, res);
});

app.get('/user/:id/roles', assertIntID, (req, res) => {
    return res.send(`Get all roles of id=${req.params.id} user`);
});

app.get('/user/:id/role/:roleid', assertIntID, (req, res) => {
    return res.send(`Get id=${req.params.roleid} role for id=${req.params.id} user`);
});
app.post('/user/:id/role/:roleid', assertIntID, (req, res) => {
    return res.send(`Grant id=${req.params.roleid} role to id=${req.params.id} user`);
});
app.put('/user/:id/role/:roleid', assertIntID, (req, res) => {
    return res.send(`Update id=${req.params.roleid} role for id=${req.params.id} user`);
});
app.delete('/user/:id/role/:roleid', assertIntID, (req, res) => {
    return res.send(`Delete id=${req.params.roleid} role for id=${req.params.id} user`);
});

app.get('/user/:id/teams', (req, res) => {
    return res.send(`Get all teams of id=${req.params.id} user`);
});

app.get('/user/:id/team/:teamid', assertIntID, (req, res) => {
    return res.send(`Get id=${req.params.teamid} team for id=${req.params.id} user`);
});
app.post('/user/:id/team/:teamid', assertIntID, (req, res) => {
    return res.send(`Assign id=${req.params.teamid} user to id=${req.params.id} team`);
});
app.delete('/user/:id/team/:teamid', assertIntID, (req, res) => {
    return res.send(`Remove id=${req.params.teamid} user from id=${req.params.id} team`);
});

/*------------------------------------------------

ROLE ROUTES

------------------------------------------------*/

app.get('/roles', (req, res) => {
    return res.send(Handlers.Role.sayHi());
});

app.get('/role/:id', assertIntID, (req, res) => {
    return res.send(`Get id=${req.params.id} role`);
});
app.post('/role/:id', assertIntID, (req, res) => {
    return res.send(`Create id=${req.params.id} role`);
});
app.put('/role/:id', assertIntID, (req, res) => {
    return res.send(`Update id=${req.params.id} role`);
});
app.delete('/role/:id', assertIntID, (req, res) => {
    return res.send(`Delete id=${req.params.id} role`);
});

/*------------------------------------------------

TEAM ROUTES

------------------------------------------------*/

app.get('/teams', (req, res) => {
    return res.send(Handlers.Team.sayHi());
});

app.get('/team/:id', assertIntID, (req, res) => {
    return res.send(`Get id=${req.params.id} team`);
});
app.post('/team/:id', assertIntID, (req, res) => {
    return res.send(`Create id=${req.params.id} team`);
});
app.put('/team/:id', assertIntID, (req, res) => {
    return res.send(`Update id=${req.params.id} team`);
});
app.delete('/team/:id', assertIntID, (req, res) => {
    return res.send(`Delete id=${req.params.id} team`);
});


app.listen(3000, () =>
    console.log(`Terratau listening on port ${3000}!`),
);