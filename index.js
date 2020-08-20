const Handlers = require('./handlers/handlers.js');
const Routes = require('./routes/routes.js')
const Middleware = require('./middleware/middleware.js')

var express = require('express');
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Routes.Auth(app, Handlers, Middleware);

// all following routes require auth, so we check for auth
app.use(Middleware.requireAuth);

Routes.User(app, Handlers, Middleware);

Routes.Role(app, Handlers, Middleware);

Routes.Team(app, Handlers, Middleware);

let port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Terratau listening on port ${port}!`),
);