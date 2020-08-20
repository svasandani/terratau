var express = require('express');

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth', (req, res) => {
    return res.send(`Authorize with Pukka!`);
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
    return res.send(`Get all users`);
});
   
app.get('/user/:id', (req, res) => {
    return res.send(`Get id=${req.params.id} user`);
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
    return res.send(`Get all available roles`);
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
    return res.send(`Get all teams`);
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