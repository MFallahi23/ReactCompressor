import express from "express";
import { getUsers, getUser } from "../controllers/users.controler.js";
import register from "../controllers/register.controller.js";
import { googleAuth, login } from "../controllers/login.controller.js";
import logout from "../controllers/logout.controller.js";
import refreshToken from "../controllers/refreshToken.controller.js";
import {
  validateRegister,
  validateLogin,
  validateUpdate,
} from "../helpers/validate.js";
import verifyJWT from "../middleware/verifyJWT.js";
import verifyRole from "../middleware/verifyRole.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/resetPassword.controller.js";
import updateUser from "../controllers/updateUser.controller.js";
import { upload } from "../config/upload.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Test successful!");
});

router.get("/getUser", getUser);
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/googleLogin", googleAuth);
router.get("/refresh", refreshToken);
router.post("/forgot", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
// router.get("/getUsers", verifyJWT, verifyRole("admin", "moderator"), getUsers);
router.get("/getUsers", getUsers);
router.post(
  "/update",
  verifyJWT,
  upload.single("file"),
  validateUpdate,
  updateUser
);
router.get("/logout", logout);

export default router;
