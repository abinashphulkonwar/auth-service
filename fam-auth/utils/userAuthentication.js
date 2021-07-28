const jwt = require("jsonwebtoken");

class UserAuth {
    constructor (token) {
        this.token = token;
    }

    validate () {
    if (!this.token) {
      
      return null;
    }

    const jwtToken =  jwt.verify(this.token, process.env.JWT_KEY);
    if (jwtToken) {
        return jwtToken;
    }
    return null;
    }
}


module.exports = UserAuth;