import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		todo: [
			{
				title: { type: String, required: true },
				content: { type: String, required: true },
				date: { type: String, required: true },
			},
		],
	},
	{ versionKey: false }
);

const Users = mongoose.model("user", UsersSchema);
export default Users;
