const jwt = require('jsonwebtoken');
const { secret } = require('../configs/secrets');

module.exports = (req, res, next) => {
  // create a variable for the token from the clients request.
  const token = req.headers.authorization;
  console.log(token);

  // if token is false, return a 401.
  if (!token) return res.status(422).send("Access Denied")
  try {
      // Verify the JWT that we have to the clients JWT
      const verified = jwt.verify(token, secret)

      // store the verified payload to the user object in the locals object.
      res.locals.user = verified
      next()
  } catch (error) {
      res.status(401)
          .json(error)
          .send("Invalid Token")
  }
};
