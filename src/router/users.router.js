import express from "express";
import passport from "passport";
import UserController from "../controller/users.controller.js";

const router = express.Router();
const controller = new UserController();

router.post("/signup", async (req, res, next) => {
	await controller.registerUsers(req, res, next);
});

router.post("/signin", async (req, res, next) => {
	await controller.loginUsers(req, res, next);
});

router.get("/logout", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
	await controller.logoutUser(req, res, next);
});

export default router;
