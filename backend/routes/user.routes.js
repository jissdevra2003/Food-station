import Router from "express";
import {registerUser,loginUser, getUserProfile,forgotPassword,resetPassword} from '../controllers/user.controller.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'


const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)


export default router