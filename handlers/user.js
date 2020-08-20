module.exports = {
    getAllUsers(req, res) {
        // TODO: get all users from database
        let users = [{}];

        res.send(users);
    },

    getUser(req, res) {
        let id = req.params.id;

        // TODO: get user from database
        let user = {id: id};

        res.send(user);
    },

    updateUser(req, res) {
        let id = req.params.id;
        let userparam = req.params.user;

        // TODO: get user from database
        let user = {id: id};

        // TODO: validate user model

        // TODO: update user model in database
        let success = true;

        if (success) {
            res.send(user);
        } else {
            res.status(500).send("Something went wrong. Please try again.")
        }
    },

    deleteUser(req, res) {
        let id = req.params.id;

        // TODO: get user from database
        let user = {id: id};

        // TODO: delete user from database
        let success = true;

        if (success) {
            res.send(user);
        } else {
            res.status(500).send("Something went wrong. Please try again.")
        }   
    }
}