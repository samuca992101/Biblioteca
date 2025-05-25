import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Autor } from "../models/Autor";

export class AutorController {
  private autorRepository = AppDataSource.getRepository(Autor);

  listarTodos = async (req: Request, res: Response) => {
    const autores = await this.autorRepository.find({ relations: ["livros"] });
    return res.json(autores);
  };

  criar = async (req: Request, res: Response) => {
    const { nome } = req.body;

    const autor = this.autorRepository.create({ nome });
    await this.autorRepository.save(autor);

    return res.status(201).json(autor);
  };

  atualizar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;

    const autor = await this.autorRepository.findOneBy({ id: parseInt(id) });

    if (!autor) {
      return res.status(404).json({ mensagem: "Autor não encontrado" });
    }

    autor.nome = nome;
    await this.autorRepository.save(autor);

    return res.json(autor);
  };

  remover = async (req: Request, res: Response) => {
    const { id } = req.params;

    const autor = await this.autorRepository.findOneBy({ id: parseInt(id) });

    if (!autor) {
      return res.status(404).json({ mensagem: "Autor não encontrado" });
    }

    await this.autorRepository.remove(autor);

    return res.status(204).send(); // No Content
  };

  buscarPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    const autor = await this.autorRepository.findOneBy({ id: parseInt(id) });

    if (!autor) {
      return res.status(404).json({ mensagem: "Autor não encontrado" });
    }

    return res.json(autor);
  };
}
