import { Router } from "express";
import { LivroController } from "../controllers/LivroController";

const router = Router();
const controller = new LivroController();

router.get("/", controller.listar);
router.post("/", controller.criar);

export default router;
