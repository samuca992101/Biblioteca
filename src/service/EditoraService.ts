import { livroRepository } from "../repositories/LivroRepository";
import { Livro } from "../models/Livro";

interface CriarEditora {
    nome: string;
    nomesLivros: string[];
}

export class EditoraService {
    static async criarEditoraComLivros(dados: CriarEditora): Promise<Livro[]> {
        const livros: Livro[] = [];

        // Para cada nome, criamos um livro e salvamos
        for (const nome of dados.nomesLivros) {
            const livro = livroRepository.create({ titulo: nome });
            await livroRepository.save(livro);
            livros.push(livro);
        }

        // Retornamos os livros criados
        return livros;
    }
}