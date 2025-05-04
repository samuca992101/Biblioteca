import { Router } from "express";
import { AutorController } from "../controllers/AutorController";

const router = Router();
const controller = new AutorController();

router.get("/", controller.listarTodos);
router.post("/", controller.criar);

export default router;
