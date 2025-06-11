import { Router } from 'express';
import { EditoraController } from "../controllers/EditoraController";

const router = Router();
const controller = new EditoraController();
router.get("/", controller.listar.bind(controller));
router.post("/", controller.criar.bind(controller));
router.get("/:id", controller.buscarporId.bind(controller)); 
router.put("/:id", controller.atualizar.bind(controller));

export default router;