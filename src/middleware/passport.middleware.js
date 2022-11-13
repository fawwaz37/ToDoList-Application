import { Strategy } from "passport-local";
import passportJWT from "passport-jwt";
import sign from "jwt-encode";

import { getHashedPassword } from "../../lib/crypto.js";
import Users from "../../database/model/users.model.js";
import { client } from "../../database/index.js";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function (passport) {
	passport.use(
		new Strategy(
			{
				usernameField: "email",
				passwordField: "password",
			},
			async (email, password, cb) => {
				const hashed = getHashedPassword(password);
				return Users.findOne({ email, password: hashed })
					.then(async (user) => {
						if (!user) {
							return cb(null, false, {
								message: "Incorrect email or password.",
							});
						} else {
							return cb(null, user, {
								message: "Logged In Successfully",
							});
						}
					})
					.catch((err) => {
						console.log(err);
						cb(err);
					});
			}
		)
	);

	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
				secretOrKey: process.env.jwt,
			},
			async (jwtPayload, cb) => {
				const token = sign(jwtPayload, process.env.jwt);
				const inBlackList = await client.get(`jwt_bl_${token}`);
				return Users.findOne({ _id: jwtPayload._id })
					.then(async (user) => {
						if (!user) {
							return cb(null, false);
						}
						if (inBlackList) {
							return cb(null, false);
						}
						return cb(null, user);
					})
					.catch((err) => {
						console.log(err);
						return cb(err);
					});
			}
		)
	);
}
