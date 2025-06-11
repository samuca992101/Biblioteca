import { Router } from "express";
import { AutorController } from "../controllers/AutorController";

const router = Router();
const controller = new AutorController();

router.get("/", controller.listarTodos.bind(controller));
router.post("/", controller.criar.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.put("/:id", controller.atualizar.bind(controller));
router.delete("/:id", controller.remover.bind(controller));

export default router;
