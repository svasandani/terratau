module.exports = {
    talkToPukka(req, res) {
        // TODO: validate reqeust body

        let authCode = req.body.authCode;

        // TODO: send auth_code to pukka, get request

        // TODO: generate JWT

        res.send({"token": ""});
    }
}