import Users from "../model/users.model.js";
import { moment } from "../../lib/moment.js";
const date = moment().format("DD/MM/YY HH:mm:ss");

class TodoDB {
	constructor() {
		this.todo = Users;
	}

	async createTodo(email, title, content) {
		const db = await this.todo.findOne({ email });
		if (db) {
			let obj = { title, content, date };
			const up = await this.todo.findOneAndUpdate({ email }, { $push: { todo: obj } }, { new: true });
			return up.todo[up.todo.length - 1];
		}
	}

	async getAllTodo(email) {
		const data = await this.todo.findOne({ email });
		const result = data ? data.todo : null;
		return result;
	}

	async getTodoById(_id) {
		const data = await this.todo.findOne({ todo: { $elemMatch: { _id } } });
		const result = data ? data.todo[data.todo.findIndex((x) => x._id == _id)] : null;
		return result;
	}

	async updateTodo(_id, title, content) {
		const data = await this.todo.findOne({ todo: { $elemMatch: { _id: _id } } });
		if (data) {
			const up = await this.todo.findOneAndUpdate({ "todo._id": _id }, { $set: { "todo.$.title": title, "todo.$.content": content, "todo.$.date": date } }, { new: true });
			const index = up.todo.findIndex((x) => x._id == _id);
			return up.todo[index];
		}
	}

	async deleteTodo(_id) {
		const data = await this.todo.findOne({ todo: { $elemMatch: { _id } } });
		if (data) {
			const deletes = await this.todo.findOneAndUpdate({ "todo._id": _id }, { $pull: { todo: { _id } } }, { new: true });
			return deletes;
		}
	}

	async deleteAllTodo(email) {
		const data = await this.todo.findOne({ email });
		if (data) {
			const now = await this.todo.findOneAndUpdate({ email }, { $set: { todo: [] } }, { new: true });
			return now;
		}
	}
}

export default TodoDB;
