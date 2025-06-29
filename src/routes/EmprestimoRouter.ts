import { Router, Request, Response } from 'express';
import { EmprestimoController } from '../controllers/EmprestimoController';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
	try {
		await EmprestimoController.buscarEmprestimoPorId(req, res);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});
router.get('/', (req, res) => EmprestimoController.listarEmprestimos(req, res));
router.post('/', (req, res) => EmprestimoController.criarEmprestimo(req, res));
router.put('/:id', (req, res) => EmprestimoController.atualizarEmprestimo(req, res));
router.delete('/:id', (req, res) => EmprestimoController.deletarEmprestimo(req, res));

export default router;