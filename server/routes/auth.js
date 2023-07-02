const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/notes.model');
const {checkUser} = require("../middleware/authmiddleware")
const router = require('express').Router();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "sonu super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Registration route
router.route('/register').post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt=10;
    const hashPassword = await bcrypt.hash(password,salt);
    const user = await User.create({ email, password:hashPassword });
    
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
});

// Login route
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
});

router.route("/").post(checkUser,(req,res)=>{

  if(req.Status==true){
    res.json({status:true});
  }else{
    res.json({status:false});
  }
})

module.exports = router;