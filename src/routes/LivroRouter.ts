import { Router } from "express";
import { LivroController } from "../controllers/LivroController";

const router = Router();
const controller = new LivroController();

router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;
