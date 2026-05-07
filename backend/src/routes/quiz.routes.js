import { Router } from "express";
import { createQuizController, deleteQuizController, getQuizByIdController, getQuizzesController } from "../controllers/quiz.controller.js";
const router = Router();
router.post("/", createQuizController);
router.get("/", getQuizzesController);
router.get("/:id", getQuizByIdController);
router.delete("/:id", deleteQuizController);
export default router;
//# sourceMappingURL=quiz.routes.js.map