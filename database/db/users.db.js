import Users from "../model/users.model.js";

class UserDB {
	constructor() {
		this.users = Users;
	}

	async createUsers(email, password) {
		const create = await this.users.create({ email, password, todo: [] });
		return create;
	}

	async findOneEmail(email) {
		const db = await this.users.findOne({ email });
		const result = db ? db : null;
		return result;
	}
}

export default UserDB;
