const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const db = require('./db/db.js');
const bcrypt = require('bcrypt');
const session = require('client-sessions');
const sessionSecret = require('./sessionSecret.js');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    cookieName: 'session',
    secret: sessionSecret.secret,
    duration: 30 * 60 * 1000 // 30 mins
}));

app.post("/register", (req, res) => {
    const newUser = req.body;
    let hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;
    db.users.push(newUser);
    const output = {
        success: true,
        message: "Registration successful."
    };

    return res.status(200).send(output);
});

app.post("/login", (req, res) => {
    const sessionExists = req.session.email;
    const {email, password} = req.body;
    const output = {
        success: true,
        loggedIn: false,
        message: "Invalid email and/or password."
    };

    if(sessionExists && req.session.email === email){
        output.loggedIn = true,
        output.message = "User is already logged in."
    }
    else{
        for(let i in db.users){
            if(db.users[i].email === email && bcrypt.compareSync(password, db.users[i].password)){
                output.loggedIn = true;
                output.message = "Successful login."
    
                req.session.email = email;
            }
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