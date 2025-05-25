import { autorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";

export class AutorService {
  static async criarOuBuscarPorNome(nome: string): Promise<Autor> {
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
    return await autorRepository.find();
  }
}
