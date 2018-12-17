const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const db = require('./db/db.js');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.post("/register", (req, res) => {
    db.users.push(req.body);
    const output = {
        success: true,
        message: "Registration successful."
    };

    return res.status(200).send(output);
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    const output = {
        success: true,
        loggedIn: false,
        message: "Invalid email and/or password."
    };

    for(let i in db.users){
        if(db.users[i].email === email && db.users[i].password === password){
            output.loggedIn = true;
            output.message = "Successful login."
        }
    }
    return res.status(401).send(output);
});

app.get("/users", (req, res) => {
    const output = {
        success: true,
        message: "Retrieval of user data successful.",
        users: db.users
    };

    return res.status(200).send(output);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});