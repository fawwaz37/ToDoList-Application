import mongoose from "mongoose";

const TodosSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{ versionKey: false }
);

const Todos = mongoose.model("todo", TodosSchema);
export default Todos;
