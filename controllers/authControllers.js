const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const Register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(401).json({ message: "User is created ..." });
    }
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);

      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,

        password: hashedPassword,
      });

      await newUser.save();

      return res.status(201).json({
        message: "user is registered",
      });
    } else {
      return res.status(403).json({
        message: "please provide password",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

async function Login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: " Wrong password" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "token asignado" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = { Register, Login };
