module.exports = {
    sayHi() {
        return "User says hi";
    },

    getUser(req, res) {
        let id = req.params.id;

        // get user from database
        user = {id: id};

        res.send(user);
    },

    deleteUser(req, res) {

    }
}