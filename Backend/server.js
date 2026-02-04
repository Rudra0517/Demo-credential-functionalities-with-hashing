require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

app.use(express.json());
app.use(cors());

const connectDB = require("./config/db");

connectDB();

const {
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
} = require("./controllers/usercontrollers");
const { authorization } = require("./middleware/authmiddleware");

//* test of authorization

app.get("/test", testController);

//*all users
app.get("/allusers", allUserController);

//* fetch user by id
app.get("/allusers/:id", userByIdController);

//* register
app.post("/register", registerController);

//* login
app.post("/login", loginController);

//* update user
app.put("/updateuser/:id", updateUserController);

//* Delete User
app.delete("/deleteuser/:id", deleteuserController);

//* verify-email
app.post("/verify-email", verifyEmailController);

//* verify-otp
app.post("/verify-otp", verifyOtpController);

//* resetpasword
app.post("/resetpassword", resetpasswordController);

app.listen(process.env.PORT, () => {
  console.log("Server is runinng...");
});
