const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // const email = req.body;
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(401).json({ message: "email already existed!" });
    }

    // Create a user object

    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: hasPassword,
      user_role: req.body.user_role,
    });

    // Save User in the database
    await newUser.save();
    // create payload then Generate an access token
    let payload = {
      id: newUser._id,
      user_role: req.body.user_role,
    };
    // const token = jwt.sign(payload, config.TOKEN_SECRET);
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerRole = async (req, res) => {
  try {
    const name = req.body;

    const newRole = new Role(name);

    const role = await newRole.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user_ = await User.findOne({ email: req.body.email });
    
        if (user_) {
          const validPass = await bcrypt.compare(req.body.password, user_.password);
          if (!validPass)
            return res.status(401).send("Email or Password is wrong");

          // Create and assign token
          let payload = { id: user_._id, user_role_id: user_.user_role._id };
          // const token = jwt.sign(payload, config.TOKEN_SECRET);
          const token = jwt.sign(payload, process.env.JWT_SECRET);

          res.status(200).header("auth-token", token).send({ token: token });
        } else {
          res.status(401).send("Invalid ");
        }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userEvent = async (req, res) => {
  res.status(200).json({ message: "users can acess this page" });
}

const adminEvent = async (req, res) => {
  res.status(200).json({ message: "admins can acess this page" });
}

module.exports = {
  userEvent,
  adminEvent,
  login,
  register,
  registerRole,
};
