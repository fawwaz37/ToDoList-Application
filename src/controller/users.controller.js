import passport from "passport";
import jwt from "jsonwebtoken";
import UserDB from "../../database/db/users.db.js";
import ErrorHandler from "../middleware/err.middleware.js";
import { getHashedPassword } from "../../lib/crypto.js";
import { client } from "../../database/index.js";

class UserController extends UserDB {
	constructor() {
		super();
		this.err = new ErrorHandler();
	}

	async registerUsers(req, res, next) {
		try {
			const { email, password, confirmPassword } = req.body;
			if (!email || !password || !confirmPassword) {
				return this.err.badRequest(res);
			}
			const data = await this.findOneEmail(email);
			if (data) {
				return res.status(400).send({
					status: res.statusCode,
					message: `Email Sudah Pernah Terdaftar!`,
				});
			} else {
				if (password.length >= 6) {
					if (password == confirmPassword) {
						const hash = getHashedPassword(password);
						await this.createUsers(email, hash);
						return res.status(200).send({
							status: res.statusCode,
							message: `Succes Create Account Email : ${email}`,
						});
					} else {
						return res.status(400).send({
							status: res.statusCode,
							message: `Password Tidak Sama!`,
						});
					}
				} else {
					return res.status(400).send({
						status: res.statusCode,
						message: `Password Harus Lebih Dari 6 Karakter!`,
					});
				}
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async loginUsers(req, res, next) {
		try {
			passport.authenticate("local", { session: false }, (err, user, info) => {
				if (err || !user) {
					console.log(err);
					return res.status(400).json({
						status: res.statusCode,
						message: info.message,
					});
				}
				req.login(user, { session: false }, async (err) => {
					if (err) {
						console.log(err);
						res.send(err);
					}
					let userData = user.toObject();
					const token = jwt.sign({ _id: userData._id }, process.env.jwt, {
						expiresIn: process.env.expiredJWT,
					});
					return res.status(200).send({
						status: res.statusCode,
						message: info.message,
						token,
					});
				});
			})(req, res, next);
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async logoutUser(req, res, next) {
		try {
			let token = req.headers.authorization.split(" ")[1];
			let token_object = jwt.verify(token, process.env.jwt);
			await client.set(`jwt_bl_${token}`, token);
			client.expireAt(`jwt_bl_${token}`, token_object.exp);
			return res.status(200).send({
				status: res.statusCode,
				message: `Logout Sukses, Token invalidated`,
			});
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}
}

export default UserController;
