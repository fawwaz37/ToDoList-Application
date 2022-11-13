import express from "express";
import TodoController from "../controller/todo.controller.js";

const router = express.Router();
const controller = new TodoController();

router.get("/:id?", async (req, res, next) => {
	await controller.getTodos(req, res, next);
});

router.post("/", async (req, res, next) => {
	await controller.createTodoUser(req, res, next);
});

router.put("/:id", async (req, res, next) => {
	await controller.updateTodoUser(req, res, next);
});

router.delete("/:id?", async (req, res, next) => {
	await controller.deleteTodoUser(req, res, next);
});

export default router;
