import { Router } from "express";
import { AutorController } from "../controllers/AutorController";

const router = Router();
const controller = new AutorController();

router.get("/", controller.listarTodos);
router.post("/", controller.criar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

export default router;
