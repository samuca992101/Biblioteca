import { livroRepository } from "../repositories/LivroRepository";
import { autorRepository } from "../repositories/AutorRepository";
import { Livro } from "../models/Livro";
import { Autor } from "../models/Autor";

interface CriarLivroComAutoresDTO {
  titulo: string;
  anoPublicacao: number;
  genero: string;
  nomesAutores: string[]; // agora é uma lista de nomes
}

export class LivroService {
  static async criarLivroComAutores(dados: CriarLivroComAutoresDTO): Promise<Livro> {
    const autores: Autor[] = [];

    // Para cada nome, criamos um autor e salvamos
    for (const nome of dados.nomesAutores) {
      const autor = autorRepository.create({ nome });
      await autorRepository.save(autor);
      autores.push(autor);
    }

    // Criamos e salvamos o livro com os autores associados
    const livro = livroRepository.create({
      titulo: dados.titulo,
      anoPublicacao: dados.anoPublicacao,
      genero: dados.genero,
      autores,
    });

    return await livroRepository.save(livro);
  }
}
