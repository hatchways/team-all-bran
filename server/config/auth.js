const jwt = require("jsonwebtoken");

const { User } = require("../models/User");

module.exports = async function getUser(req, res, next) {
  // Get token from header
  const token = req.query.token ? req.query.token : req.cookies.token;

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const id = jwt.verify(token, process.env.secretKey).user._id;
    //Return user interviews here
    const user = await User.findById(id).populate("interviews");
    const userObject = user.toJSON();
    userObject.token = token;
    res.status(200).json({ user: userObject });
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
