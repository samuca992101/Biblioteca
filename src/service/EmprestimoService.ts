import { emprestimoRepository } from "../repositories/EmprestimoRepository";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoService {
    static async criarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
        return await emprestimoRepository.save(emprestimo);
    }

    static async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
        return await emprestimoRepository.findOneBy({ id });
    }

    static async atualizarEmprestimo(id: number, emprestimo: Partial<Emprestimo>): Promise<Emprestimo | null> {
        await emprestimoRepository.update(id, emprestimo);
        return this.buscarEmprestimoPorId(id);
    }

    static async deletarEmprestimo(id: number): Promise<void> {
        await emprestimoRepository.delete(id);
    }
    static async listarEmprestimos(): Promise<Emprestimo[]> {
        return await emprestimoRepository.find({ relations: ["usuario", "livro"] });
    }
}
