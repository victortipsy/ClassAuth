import { Router } from "express";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validation/authValidation/userValidation";
import { register, login, allusers } from "../controls/user.control";

const router = Router();

router.route("/register").post(registerValidation, register);
router.route("/login").post(loginValidation, login);
router.route("/").get(allusers);

export default router;
