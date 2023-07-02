const User = require("../models/notes.model");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async(req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, "sonu super secret key", async (err, decodedToken) => {
      if (err) {
        // res.json({ status: false });
        req.Status = false;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        
        if (user) {
          // res.json({ status: true});
          req.Status = true;
          req.email = user.email;
        } else {
          // res.json({ status: false });
          req.Status=false;
        }
        next();
      }
    });
  } else {
    // res.json({ status: false });
   
    req.Status=false;
    next();
  }
};
