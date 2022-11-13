import mongoose from "mongoose";
import redis from "redis";

let client = null;

class Connection {
	constructor() {}

	async connectMongo() {
		mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const database = mongoose.connection;
		database.on("error", console.error.bind(console, "connection error:"));
		database.once("open", () => {
			console.log(`[DB] MongoDB Connected!`);
		});
	}

	async connectRedis() {
		client = redis.createClient({
			url: process.env.REDIS_URL,
		});
		client.on("error", (error) => {
			console.log(`Ini Error Redis : ${error}`);
		});
		client.on("connect", () => {
			console.log("[DB] Redis Connected!");
		});

		await client.connect();
	}
}

export { Connection, client };
