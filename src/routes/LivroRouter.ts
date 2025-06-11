import { Router } from "express";
import { LivroController } from "../controllers/LivroController";
import { upload } from "../middleware/upload";

const router = Router();
const controller = new LivroController();

router.get("/", controller.listar);
router.post("/", controller.criar);
router.get("/:id", controller.buscarPorId.bind(controller));
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);
router.post("/:id/capa", upload.single("capa"), controller.uploadCapa.bind(controller));

export default router;
