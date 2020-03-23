const jwt = require('jsonwebtoken');
const {secret} = require('./secrets');
function generateToken(user) {
    const payload = {
      emailAddr: user.email, // sub
    }
    const options = {
      expiresIn: '24h',
    }
    return jwt.sign(payload, secret, options);
}

module.exports = generateToken;