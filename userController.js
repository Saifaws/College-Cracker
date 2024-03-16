const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    
    const { name, email, password, cnf_password } = req.body;
    // console.log(name, email, password, cnf_password);

  if (password !== cnf_password) {
    return res.status(500).send("The two passwords don't match");
  }

  const user = await UserModel.findOne({ email: email });
  console.log("user", user);

  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    
    const token = jwt.sign({ userID: newUser._id }, "randomsecret");
    return res.status(200).json({
      user: newUser,
      token,
    });
  } else {
    return res.status(500).send("User email already exists");
  }
}
catch (error) {
 console.log(error);   
 return res.status(500).json({
  error:error.message,
  messgae: error,
 })
}
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).send("User does not exist");
  }

  const isPasswordMatchingFromDB = await bcrypt.compare(
    password,
    user.password
  );

  console.log(isPasswordMatchingFromDB);
  if (isPasswordMatchingFromDB) {
    const token = jwt.sign({ userID: user._id }, "randomsecret");
    return res.status(200).json({ user, token });
  }

  res
    .status(401)
    .send("Incorrect login credentials i.e. userHandle/email or password!");
};

const updateUser = async(req, res) => {
  const {userid,user} = req.body;

  console.log(req.body);
  const newUser = await UserModel.findOne({ _id: userid });
  if(!newUser){
    return res.status(400).json({
      newUser: user,
    });
  }
    
  const isPasswordMatchingFromDB = await bcrypt.compare(
    user.password,
    newUser.password
  );

  if (isPasswordMatchingFromDB) {
    const updated = await UserModel.findByIdAndUpdate({_id:newUser._id},{name:user.name},{new:true});
    console.log("hii",updated);
    return res.status(200).json({ newUser:updated});
  }
  
  console.log(newUser);
  return res.status(200).json({
    newUser: user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};
