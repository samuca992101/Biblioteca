import { editoraRepository } from "../repositories/EditoraRepository";
import { Editora } from "../models/Editora";

export class EditoraService {
  static async listar(): Promise<Editora[]> {
    return await editoraRepository.find({ relations: ["livros"] });
  }

  static async criar(nome: string): Promise<Editora> {
    const editora = editoraRepository.create({ nome });
    return await editoraRepository.save(editora);
  }

  static async buscarPorId(id: number): Promise<Editora | null> {
    return await editoraRepository.findOne({
      where: { id },
      relations: ["livros"]
    });
  }

  static async atualizar(id: number, nome: string): Promise<Editora> {
    const editora = await editoraRepository.findOneBy({ id });

    if (!editora) {
      throw new Error("Editora não encontrada");
    }

    editora.nome = nome;
    return await editoraRepository.save(editora);
  }

  static async deletar(id: number): Promise<void> {
    const editora = await editoraRepository.findOneBy({ id });

    if (!editora) {
      throw new Error("Editora não encontrada");
    }

    await editoraRepository.remove(editora);
  }
}
