const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const session = require('client-sessions');
const sessionSecret = require('./sessionSecret.js'); // this file needs to be added manually as it was part of the gitignore file

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    cookieName: 'session',
    secret: sessionSecret.secret,
    duration: 30 * 60 * 1000 // 30 mins
}));

require('./routes')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});