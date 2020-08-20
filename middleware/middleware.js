module.exports = {
    // require authorization for all endpoints except auth
    requireAuth(req, res, next) {
        let jwt = req.header('Authorization');
    
        if (jwt == null || jwt == '') {
            res.status(403).send(`No JWT provided.`)
        } else {
            // TODO: restrict all endpoints except GET to admin
            next();
        }
    },

    // fairly common operation, so we extract it to middleware
    assertIntID(req, res, next) {
        if (isNaN(req.params.id) || (req.params.roleid && isNaN(req.params.roleid)) || (req.params.teamid && isNaN(req.params.teamid))) {
            res.status(400).send("ID should be an integer.");
        } else {
            next();
        }
    }
}