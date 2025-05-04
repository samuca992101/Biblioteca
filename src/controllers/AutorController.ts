// src/controllers/AutorController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../service/data-source";
import { Autor } from "../models/Autor";

export class AutorController {
  private autorRepository = AppDataSource.getRepository(Autor);

  async listarTodos(req: Request, res: Response) {
    const autores = await this.autorRepository.find({ relations: ["livros"] });
    return res.json(autores);
  }

  async criar(req: Request, res: Response) {
    const { nome } = req.body;

    const autor = this.autorRepository.create({ nome });
    await this.autorRepository.save(autor);

    return res.status(201).json(autor);
  }
}
