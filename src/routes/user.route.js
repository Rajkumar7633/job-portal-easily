import express from "express";
import UserController from "../controllers/user.controller.js";

const userController = new UserController();

const router = express.Router();

router.route("/register").post(userController.addUser);
router.route("/login").get(userController.getLogin);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(userController.logoutUser);

export default router;
