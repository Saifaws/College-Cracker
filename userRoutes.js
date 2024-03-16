const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/update-user", updateUser);

module.exports = router;
