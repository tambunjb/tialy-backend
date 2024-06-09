const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).send("Unauthorized access");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKENKEY);
    req.user = decoded.email;

    if(!(await User.findOne({ email: req.user })))
      throw new Error("Invalid Credentials");
    
  } catch (err) {
    return res.status(401).send("Unauthorized access");
  }
  
  return next();
};

module.exports = verifyToken;
