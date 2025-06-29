import {Router} from 'express';
import {UsuarioController} from '../controllers/UsuarioController';

const router = Router();

router.get('/', UsuarioController.listarUsuarios);
router.get('/:id', UsuarioController.buscarUsuarioPorId);
router.post('/', UsuarioController.criarUsuario);
router.put('/:id', UsuarioController.atualizarUsuario);
router.delete('/:id', UsuarioController.deletarUsuario);

export default router;