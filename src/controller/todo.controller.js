import TodoDB from "../../database/db/todo.db.js";
import UserDB from "../../database/db/users.db.js";
import ErrorHandler from "../middleware/err.middleware.js";

class TodoController extends TodoDB {
	constructor() {
		super();
		this.user = new UserDB();
		this.err = new ErrorHandler();
	}

	async createTodoUser(req, res, next) {
		try {
			const { title, content } = req.body;
			if (!title || !content) {
				return this.err.badRequest(res);
			}
			const user = await this.user.findOneEmail(req.user.email);
			if (user) {
				const create = await this.createTodo(req.user.email, title, content);
				if (create) {
					return res.status(200).send({
						status: res.statusCode,
						message: `Succes Create Todo`,
						data: { detail: create },
					});
				} else {
					return res.status(500).send({
						status: res.statusCode,
						message: `Oops Someting Wrong!`,
					});
				}
			} else {
				return res.status(404).send({
					status: res.statusCode,
					message: `Data User Tidak Ditemukan!`,
				});
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async getAllTodoUser(req, res, next) {
		try {
			const data = await this.getAllTodo(req.user.email);
			if (data) {
				return res.status(200).send({
					status: res.statusCode,
					message: `Succes GET Detail Todo`,
					data: { list: data },
				});
			} else {
				return res.status(404).send({
					status: res.statusCode,
					message: `Data User Tidak Ditemukan!`,
				});
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async getTodos(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				const data = await this.getAllTodo(req.user.email);
				if (data) {
					return res.status(200).send({
						status: res.statusCode,
						message: `Succes GET Detail Todo`,
						data: { list: data },
					});
				} else {
					return res.status(404).send({
						status: res.statusCode,
						message: `Data User Tidak Ditemukan!`,
					});
				}
			} else {
				const data = await this.getTodoById(id);
				if (data) {
					return res.status(200).send({
						status: res.statusCode,
						message: `Succes GET Detail Todo`,
						data: { detail: data },
					});
				} else {
					return res.status(404).send({
						status: res.statusCode,
						message: `Data Todo Tidak Ditemukan!`,
					});
				}
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async updateTodoUser(req, res, next) {
		try {
			const { id } = req.params;
			const { title, content } = req.body;
			if (!title || !content) {
				return this.err.badRequest(res);
			}
			const update = await this.updateTodo(id, title, content);
			if (update) {
				return res.status(200).send({
					status: res.statusCode,
					message: `Succes Update Todo`,
					data: { detail: update },
				});
			} else {
				return res.status(404).send({
					status: res.statusCode,
					message: `Data Todo Tidak Ditemukan!`,
				});
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async deleteTodoUser(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				const deletes = await this.deleteAllTodo(req.user.email);
				if (deletes) {
					return res.status(200).send({
						status: res.statusCode,
						message: `Succes Delete Todo`,
						data: { list: deletes.todo },
					});
				} else {
					return res.status(404).send({
						status: res.statusCode,
						message: `Data User Tidak Ditemukan!`,
					});
				}
			} else {
				const deletes = await this.deleteTodo(id);
				if (deletes) {
					return res.status(200).send({
						status: res.statusCode,
						message: `Succes Delete Todo With ID : ${id}`,
						data: { list: deletes.todo },
					});
				} else {
					return res.status(404).send({
						status: res.statusCode,
						message: `Data Todo Tidak Ditemukan!`,
					});
				}
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}

	async deleteAllTodoUser(req, res, next) {
		try {
			const deletes = await this.deleteAllTodo(req.user.email);
			if (deletes) {
				return res.status(200).send({
					status: res.statusCode,
					message: `Succes Delete Todo`,
					data: { list: deletes.todo },
				});
			} else {
				return res.status(404).send({
					status: res.statusCode,
					message: `Data User Tidak Ditemukan!`,
				});
			}
		} catch (error) {
			console.log(error);
			this.err.internalError(res);
		}
	}
}

export default TodoController;
