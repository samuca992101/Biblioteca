import {usuarioRepository} from '../repositories/UsuarioRepository';
import { Usuario } from '../models/Usuario';

export class UsuarioService {
    static async criarUsuario(usuario: Usuario): Promise<Usuario> {
        return await usuarioRepository.save(usuario);
    }

    static async buscarUsuarioPorId(id: number): Promise<Usuario | null> {
        return await usuarioRepository.findOneBy({ id });
    }

    static async atualizarUsuario(id: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
        await usuarioRepository.update(id, usuario);
        return this.buscarUsuarioPorId(id);
    }

    static async deletarUsuario(id: number): Promise<void> {
        await usuarioRepository.delete(id);
    }
    static async listarUsuarios(): Promise<Usuario[]> {
        return await usuarioRepository.find();
    }
}