const verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).send("Access Denied / Unauthorized request");

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    req.user = verifiedUser; // user_id & user_type_id
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

const IsUser = async (req, res, next) => {
  if (req.user.user_role_id === "user") {
    next();
  }
  return res.status(401).send("Unauthorized!");
};
const IsAdmin = async (req, res, next) => {
  if (req.user.user_role_id === "admin") {
    next();
  }
  return res.status(401).send("Unauthorized!");
};

module.exports = {
  IsAdmin,
  IsUser,
  verifyUserToken,
};
