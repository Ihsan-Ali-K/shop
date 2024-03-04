const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const jwtSecret = "sajidsajid";

//Create a user using auth
router.post('/createuser', [
  body('name', "enter a valid name").isLength({ min: 5 }),
  body('email', "enter a valid email").isEmail(),
  body('password', "password must be at least 5 characters").isLength({ min: 5 })

], async (req, res) => {
 let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //Route1 check whether the email already exists
  try {

    let user = await Users.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({success, error: "sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret);
 success = true;
    res.json({success, authToken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }

})

// Route 2: Login a user using auth
router.post('/loginuser', [
  body('email', "enter a valid email").isEmail(),
  body('password', "Password cannot be blank").exists()

], async (req, res) => {
let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {


    const { email, password } = await req.body;
    let user = await Users.findOne({ email })
    if (!user) {
      return res.status(400).json({ success, error: "please login with coreect informaiton" })
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success, error: "please login with corct informaiton" })
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, jwtSecret);
    success = true;
    res.json({success, authToken })
    console.log(authToken)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error occured");

  }



})

// Route 3: get a user data
router.post('/getuser',fetchuser, async (req, res) => {

try {
  const userId =req.user.id;
  const user = await Users.findById(userId).select("-password")
  res.json(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("server error occured");

}
})

module.exports = router;