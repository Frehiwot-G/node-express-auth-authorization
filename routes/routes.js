const router = require("express").Router();
const userController = require("../controller/usercontroller");
const verify = require("../middlewire/verify");

// Register a new User
router.post("/register", userController.register);
router.post("/role", userController.registerRole);

// Login
router.post("/login", userController.login);

router.get(
  "/events",
  verify.verifyUserToken,
  verify.IsUser,
  userController.userEvent
);

// Auth Admin only
router.get(
  "/special",
  verify.verifyUserToken,
  verify.IsAdmin,
  userController.adminEvent
);

module.exports = router;
