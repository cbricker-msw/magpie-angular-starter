var express = require('express');

var app = express();

var auth = express.basicAuth(function (user, pass) {
    return ('magpie' === user && 'magpie' === pass);
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    next();
});

app.get('/user', auth, function (req, res) {
    console.log("received get /user request");
    res.send({ userId: 15, name: "Magpie User" });
});

var portNumber = 3001;
app.listen(portNumber, function () {
    console.log("Listening on port " + portNumber);
});
