import { Router } from 'express';
import { EditoraController } from "../controllers/EditoraController";

const router = Router();
const controller = new EditoraController();
router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscarporId); 
router.put("/:id", controller.atualizar);

export default router;