const router = require('express').Router();
const { hashSync, compareSync } = require("bcryptjs");
const {addUser, findUsersBy} = require('../api/models/users');
const generateToken = require("../configs/token");

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    let {username, password} = req.body;
    // verify we have information
    console.log(username, password);
    // check there is information
    if(password.length >= 1 && username.length >= 1){
      // has password
      const hashedPassword = await hashSync(password, 14);
      password = hashedPassword;
      // create registered user object literal
      const registeredUser = {
        username: username,
        password: password
      }
      // Add user
      await addUser(registeredUser);
      console.log('User created');
      res.sendStatus(201);
    } else {
      console.log('User not created');
      res.sendStatus(401);
    }
  } catch (error) {
    next("There was an error" + error);
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  let { username, password } = req.body
  console.log(username, password);
  try {
    const user = await findUsersBy({ username }).first() // Search database for first user with the email from the req body.
    const isCorrectPassword = await compareSync(password, user.password) // compare the req password with the returned user pass from db.

    if (username !== user.username || !isCorrectPassword) {
        console.log("username or password was invalid.")
        res.sendStatus(401)
    } else if (username === undefined || password === undefined) {
        console.log("creds were bogus")
        res.sendStatus(401)
    } else if (username === user.username && isCorrectPassword) {
        const token = generateToken(user)
        res.status(200).json({ token })
        console.log("Success");
    }
} catch (error) {
    next(error)
}
});

module.exports = router;
