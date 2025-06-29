import {Request, Response} from 'express';
import {EmprestimoService} from '../service/EmprestimoService';
import { UsuarioService } from '../service/UsuarioService';

export class UsuarioController {
    static async criarUsuario(req: Request, res: Response) {
        try {
            const usuario = await UsuarioService.criarUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

    static async buscarUsuarioPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        const usuario = await UsuarioService.buscarUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        res.json(usuario);
    }

    static async atualizarUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const usuario = await UsuarioService.atualizarUsuario(id, req.body);
            res.json(usuario);
        } catch (error: any) {
            res.status(400).json({ mensagem: error.message });
        }
    }

    static async deletarUsuario(req: Request, res: Response) {
        const id = Number(req.params.id);
        await UsuarioService.deletarUsuario(id);
        res.status(204).send();
    }
    static async listarUsuarios(req: Request, res: Response) {
        const usuarios = await UsuarioService.listarUsuarios();
        res.json(usuarios);
    }
}
