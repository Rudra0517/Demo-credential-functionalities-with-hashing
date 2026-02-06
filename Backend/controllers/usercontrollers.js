const sendMessageViaMail = require("../config/email");
const sendOtp = require("../config/otp");
const { userModel } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const testController = (req, res) => {
  res.json({ message: "Connection is healthy" });
};

const registerController = async (req, res) => {
  try {
    const { username, email, age, gender, image_url, password, city, role } =
      req.body;

    const isExists = await userModel.findOne({ email: email });
    // console.log(isExists);

    if (isExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await userModel.insertOne({
      username,
      email,
      age,
      gender,
      image_url,
      password: hashPassword,
      city,
      role,
    });
    sendMessageViaMail(
      email,
      "Registration successfull",
      "Congratulations!!!You are Registered successfully.",
    );
    res.status(201).json({ message: "Register successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error!!!" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ message: "Incorrect password" });
    }

    const jwt_token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.status(200).json({ message: "Login successfully", jwt_token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

const updateUserController = async (req, res) => {
  try {
    const id = req.id;
    const _id = id;
    const data = req.body;
    const user = await userModel.findById(id);
    const updatedData = await userModel.updateOne(
      { _id },
      {
        $set: {
          _id,
          ...data,
        },
      },
    );
    sendMessageViaMail(
      user.email,
      "profile update",
      "Profile data updated successfully",
    );
    res.status(200).json({ message: "user is updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

const deleteuserController = async (req, res) => {
  try {
    const id = req.id;
    // const _id = id;

    await userModel.deleteOne({ _id: id });

    res.status(204).json({ message: "user Deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const { email } = req.body;

    const isUserExists = await userModel.findOne({ email: email });

    if (!isUserExists) {
      return res.status(409).json({ message: "User not exists" });
    }

    const generateOtp = () => {
      const otp = Math.floor(100000 + Math.random() * 900000);
      return otp;
    };
    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(String(otp), 10);

    // update on database
    await userModel.updateOne(
      { email: email },
      {
        $set: { OTP: hashedOtp },
      },
    );
    // send OTP to mail
    sendOtp(email, "OTP verification", `OTP(One Time Password is ${otp})`);

    res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    const user = await userModel.findOne({ email: email });

    const hashedOtp = await bcrypt.compare(String(OTP), user.OTP);
    // OTP == user.OTP

    if (hashedOtp) {
      await userModel.updateOne(
        { email },
        {
          $unset: {
            OTP,
          },
        },
      );
      res.status(200).json({ message: "OTP verify successfully" });
    } else {
      res.status(401).json({ message: "wrong OTP entered" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

const resetpasswordController = async (req, res) => {
  try {
    const { email, password, rePassword } = req.body;
    console.log(password);
    console.log(rePassword);

    if (password != rePassword) {
      return res.status(401).json({ msg: "Password mis matched" });
    }

    const user = await userModel.findOne({ email: email });

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.updateOne(
      { email: email },
      { $set: { password: hashPassword } },
    );
    sendMessageViaMail(
      email,
      "Update Password",
      "Your password Updated successfully",
    );
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

const allUserController = async (req, res) => {
  try {
    const allusers = await userModel.find();
    res.status(200).json({ users: allusers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

const userByIdController = async (req, res) => {
  try {
    const id = req.id;

    const _id = id;

    const currentUser = await userModel.findOne({ _id });
    if (!currentUser) {
      return res.json({ message: "User not found" });
    }
    res.status(200).json(currentUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. please try again" });
  }
};

module.exports = {
  registerController,
  loginController,
  updateUserController,
  deleteuserController,
  verifyEmailController,
  verifyOtpController,
  resetpasswordController,
  allUserController,
  userByIdController,
  testController,
};
