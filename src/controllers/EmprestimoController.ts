import {Request, Response} from 'express';
import {EmprestimoService} from '../service/EmprestimoService';

export class EmprestimoController {
    criarEmprestimos: any;
    static async criarEmprestimo(req: Request, res: Response) {
        try {
            const emprestimo = await EmprestimoService.criarEmprestimo(req.body);
            res.status(201).json(emprestimo);
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

    static async buscarEmprestimoPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        const emprestimo = await EmprestimoService.buscarEmprestimoPorId(id);

        if (!emprestimo) {
            return res.status(404).json({ mensagem: "Empréstimo não encontrado" });
        }

        res.json(emprestimo);
    }
    static async listarEmprestimos(req: Request, res: Response) {
        const emprestimos = await EmprestimoService.listarEmprestimos();
        res.json(emprestimos);

    }

    static async atualizarEmprestimo(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const emprestimo = await EmprestimoService.atualizarEmprestimo(id, req.body);
            res.json(emprestimo);
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

    static async deletarEmprestimo(req: Request, res: Response) {
        const id = Number(req.params.id);
        await EmprestimoService.deletarEmprestimo(id);
        res.status(204).send();
    }
}