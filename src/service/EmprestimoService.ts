import { emprestimoRepository } from "../repositories/EmprestimoRepository";
import { usuarioRepository } from "../repositories/UsuarioRepository";
import { livroRepository } from "../repositories/LivroRepository";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoService {
    static async criarEmprestimo(dados: any): Promise<Emprestimo> {
        // Busca os objetos relacionados no banco
        const usuario = await usuarioRepository.findOneBy({ id: dados.usuarioId });
        const livro = await livroRepository.findOneBy({ id: dados.livroId });

        if (!usuario) throw new Error("Usuário não encontrado!");
        if (!livro) throw new Error("Livro não encontrado!");

        // Cria o empréstimo já com os objetos completos
        const novoEmprestimo = emprestimoRepository.create({
            dataEmprestimo: new Date(), // ou dados.dataEmprestimo, se quiser permitir
            dataDevolucao: dados.dataDevolucao || null,
            usuario,
            livro
        });

        return await emprestimoRepository.save(novoEmprestimo);
    }

    static async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
        return await emprestimoRepository.findOne({ where: { id }, relations: ["usuario", "livro"] });
    }

    static async atualizarEmprestimo(id: number, dados: any): Promise<Emprestimo | null> {
    const usuario = await usuarioRepository.findOneBy({ id: dados.usuarioId });
    const livro = await livroRepository.findOneBy({ id: dados.livroId });

    if (!usuario) throw new Error("Usuário não encontrado!");
    if (!livro) throw new Error("Livro não encontrado!");

    await emprestimoRepository.update(id, {
        usuario,
        livro,
        dataEmprestimo: dados.dataEmprestimo,
        dataDevolucao: dados.dataDevolucao || null
    });

    return await emprestimoRepository.findOne({ where: { id }, relations: ["usuario", "livro"] });
}


    static async deletarEmprestimo(id: number): Promise<void> {
        await emprestimoRepository.delete(id);
    }

    static async listarEmprestimos(): Promise<Emprestimo[]> {
        return await emprestimoRepository.find({ relations: ["usuario", "livro"] });
    }
}
