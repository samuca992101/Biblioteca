import { autorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";
import { NotFoundError, BadRequestError } from "../utils/CustomErrors"; // Supondo que você crie essas classes

export class AutorService {
  static async criar(nome: string): Promise<Autor> {
    if (!nome || nome.trim() === "") {
      throw new BadRequestError("Nome do autor é obrigatório.");
    }

    const existente = await autorRepository.findOneBy({ nome });
    if (existente) {
      throw new BadRequestError("Autor já existe.");
    }

    const novoAutor = autorRepository.create({ nome });
    return await autorRepository.save(novoAutor);
  }

  static async criarOuBuscarPorNome(nome: string): Promise<Autor> {
    if (!nome || nome.trim() === "") {
      throw new BadRequestError("Nome do autor é obrigatório.");
    }

    let autor = await autorRepository.findOneBy({ nome });

    if (!autor) {
      autor = autorRepository.create({ nome });
      await autorRepository.save(autor);
    }

    return autor;
  }

  static async criarVarios(nomes: string[]): Promise<Autor[]> {
    const autores: Autor[] = [];

    for (const nome of nomes) {
      const autor = await this.criarOuBuscarPorNome(nome);
      autores.push(autor);
    }

    return autores;
  }

  static async listarTodos(): Promise<Autor[]> {
    return await autorRepository.find({ relations: ["livros"] });
  }

  static async buscarPorId(id: number): Promise<Autor> {
    const autor = await autorRepository.findOne({
      where: { id },
      relations: ["livros"]
    });

    if (!autor) {
      throw new NotFoundError("Autor não encontrado.");
    }

    return autor;
  }

  static async atualizar(id: number, nome: string): Promise<Autor> {
    const autor = await this.buscarPorId(id);

    if (!nome || nome.trim() === "") {
      throw new BadRequestError("Nome do autor é obrigatório.");
    }

    autor.nome = nome;
    return await autorRepository.save(autor);
  }

  static async remover(id: number): Promise<void> {
    const autor = await this.buscarPorId(id);
    await autorRepository.remove(autor);
  }
}
