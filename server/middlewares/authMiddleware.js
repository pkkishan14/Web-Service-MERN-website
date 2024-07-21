const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    //  If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }
  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleware: ", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // If jwt data and secret key data matches, jwt will be verified
    // console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    }); // password chhod ke sara details mil jaega
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
  next();
};

module.exports = authMiddleware;
