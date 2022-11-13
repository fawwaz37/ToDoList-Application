import "dotenv/config";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import cors from "cors";

import passp from "./src/middleware/passport.middleware.js";
import { Connection } from "./database/index.js";
import usersRouter from "./src/router/users.router.js";
import todosRouter from "./src/router/todo.router.js";

const { PORT } = process.env;
const app = express();

// Connect MongoDB
const conn = new Connection();
conn.connectMongo();
conn.connectRedis();

app.use(express.json());

// Log Morgan
app.use(morgan(`[LOG] ipAddr=:remote-addr date=[:date[web]] time=:response-time ms method=:method url=":url" status=":status" `));

// Passport Auth
app.use(passport.initialize());
passp(passport);

// CORS No Block
const corsConfig = {
	credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.get("/", (req, res) => {
	res.send("okee");
});

app.use("/users", usersRouter);
app.use("/todos", passport.authenticate("jwt", { session: false }), todosRouter);

app.listen(PORT, () => {
	console.log(`[SERVER] Listen http://localhost:${PORT}`);
});
