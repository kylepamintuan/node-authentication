const bcrypt = require('bcrypt');

module.exports = {
    users: [
        {
            firstname: "Test",
            lastname: "User",
            email: "test@gmail.com",
            password: bcrypt.hashSync('password', 14)
        }
    ]
}