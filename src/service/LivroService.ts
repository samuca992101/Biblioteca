// src/services/LivroService.ts
import { livroRepository } from "../repositories/LivroRepository";
import { autorRepository } from "../repositories/AutorRepository";
import { editoraRepository } from "../repositories/EditoraRepository";
import { In } from "typeorm";
import { Livro } from "../models/Livro";

export class LivroService {
  static async listar(): Promise<Livro[]> {
    return await livroRepository.find({ relations: ["autores", "editora"] });
  }

  static async buscarPorId(id: number): Promise<Livro | null> {
    return await livroRepository.findOne({
      where: { id },
      relations: ["autores", "editora"]
    });
  }

  static async criar(data: {
    titulo: string;
    anoPublicacao: number;
    genero: string;
    autorIds: number[];
    editoraId: number;
  }): Promise<Livro> {
    const { titulo, anoPublicacao, genero, autorIds, editoraId } = data;

    if (!Array.isArray(autorIds) || autorIds.length === 0) {
      throw new Error("É necessário informar pelo menos um autor");
    }

    const autores = await autorRepository.findBy({ id: In(autorIds) });
    if (autores.length !== autorIds.length) {
      throw new Error("Um ou mais autores não foram encontrados");
    }

    const editora = await editoraRepository.findOneBy({ id: editoraId });
    if (!editora) {
      throw new Error("Editora não encontrada");
    }

    const livro = livroRepository.create({
      titulo,
      anoPublicacao,
      genero,
      autores,
      editora
    });

    return await livroRepository.save(livro);
  }

  static async atualizar(id: number, data: {
    titulo: string;
    anoPublicacao: number;
    genero: string;
    autorIds: number[];
    editoraId: number;
  }): Promise<Livro> {
    const livro = await livroRepository.findOne({
      where: { id },
      relations: ["autores", "editora"]
    });

    if (!livro) {
      throw new Error("Livro não encontrado");
    }

    const { titulo, anoPublicacao, genero, autorIds, editoraId } = data;

    const autores = await autorRepository.findBy({ id: In(autorIds) });
    if (autores.length !== autorIds.length) {
      throw new Error("Um ou mais autores não foram encontrados");
    }

    const editora = await editoraRepository.findOneBy({ id: editoraId });
    if (!editora) {
      throw new Error("Editora não encontrada");
    }

    livro.titulo = titulo;
    livro.genero = genero;
    livro.anoPublicacao = anoPublicacao;
    livro.autores = autores;
    livro.editora = editora;

    return await livroRepository.save(livro);
  }

  static async deletar(id: number): Promise<void> {
    const livro = await livroRepository.findOneBy({ id });
    if (!livro) {
      throw new Error("Livro não encontrado");
    }
    await livroRepository.remove(livro);
  }
}
