const Handlers = require('./handlers/handlers.js');

var express = require('express');

const app = express();

console.log(Handlers);
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// all follwoing actions require auth, so we check for auth
app.use((req, res, next) => {
    let jwt = req.header('Authorization');

    if (jwt == null || jwt == '') {
        res.status(403).send(`No JWT provided.`)
    } else {
        next();
    }
  });

/*------------------------------------------------

USER ROUTES

------------------------------------------------*/

app.get('/users', (req, res) => {
    return res.send(Handlers.User.sayHi());
});
   
app.get('/user/:id', assertIntID, (req, res) => {
    return Handlers.User.getUser(req, res);
});
app.put('/user/:id', (req, res) => {
    return res.send(`Update id=${req.params.id} user`);
});
app.delete('/user/:id', (req, res) => {
    return res.send(`Delete id=${req.params.id} user`);
});

app.get('/user/:id/roles', (req, res) => {
    return res.send(`Get all roles of id=${req.params.id} user`);
});

app.get('/user/:id/role/:id', (req, res) => {
    return res.send(`Get id=${req.params.id} role for id=${req.params.id} user`);
});
app.post('/user/:id/role/:id', (req, res) => {
    return res.send(`Grant id=${req.params.id} role to id=${req.params.id} user`);
});
app.put('/user/:id/role/:id', (req, res) => {
    return res.send(`Update id=${req.params.id} role for id=${req.params.id} user`);
});
app.delete('/user/:id/role/:id', (req, res) => {
    return res.send(`Delete id=${req.params.id} role for id=${req.params.id} user`);
});

app.get('/user/:id/teams', (req, res) => {
    return res.send(`Get all teams of id=${req.params.id} user`);
});

app.get('/user/:id/team/:id', (req, res) => {
    return res.send(`Get id=${req.params.id} team for id=${req.params.id} user`);
});
app.post('/user/:id/team/:id', (req, res) => {
    return res.send(`Assign id=${req.params.id} user to id=${req.params.id} team`);
});
app.delete('/user/:id/team/:id', (req, res) => {
    return res.send(`Remove id=${req.params.id} user from id=${req.params.id} team`);
});

/*------------------------------------------------

ROLE ROUTES

------------------------------------------------*/

app.get('/roles', (req, res) => {
    return res.send(Handlers.Role.sayHi());
});

app.get('/role/:id', (req, res) => {
    return res.send(`Get id=${req.params.id} role`);
});
app.post('/role/:id', (req, res) => {
    return res.send(`Create id=${req.params.id} role`);
});
app.put('/role/:id', (req, res) => {
    return res.send(`Update id=${req.params.id} role`);
});
app.delete('/role/:id', (req, res) => {
    return res.send(`Delete id=${req.params.id} role`);
});

/*------------------------------------------------

TEAM ROUTES

------------------------------------------------*/

app.get('/teams', (req, res) => {
    return res.send(Handlers.Team.sayHi());
});

app.get('/team/:id', (req, res) => {
    return res.send(`Get id=${req.params.id} team`);
});
app.post('/team/:id', (req, res) => {
    return res.send(`Create id=${req.params.id} team`);
});
app.put('/team/:id', (req, res) => {
    return res.send(`Update id=${req.params.id} team`);
});
app.delete('/team/:id', (req, res) => {
    return res.send(`Delete id=${req.params.id} team`);
});


app.listen(3000, () =>
    console.log(`Terratau listening on port ${3000}!`),
);