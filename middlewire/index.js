const jwt = require("jsonwebtoken");

const verifyUserToken = function (req, res, next) {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).send("Access Denied / Unauthorized request");

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");
    const verifiedUser = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          console.error("Token verification error:", err.message); // Log the error message
          return res.status(400).send("Invalid Token");
        }
        console.log("Verified user:", decoded); // Log the decoded payload
        req.user = decoded; // Attach the verified user object to the request
        next();
      }
    );
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).send("Invalid Token");
  }
};

const IsUser = function async(req, res, next) {
  if (req.user.user_role === "user") {
    next();
  } else {
    return res.status(401).send("Unauthorized!");
  }
};
const IsAdmin = async (req, res, next) => {
  if (req.user.user_role === "admin") {
    next();
  } else {
    return res.status(401).send("Unauthorized!");
  }
};

module.exports = {
  IsAdmin,
  IsUser,
  verifyUserToken,
};
