import { Request, Response } from "express";
import { In } from "typeorm";
import { livroRepository } from "../repositories/LivroRepository";
import { autorRepository } from "../repositories/AutorRepository";
import { Livro } from "../models/Livro";

export class LivroController {
  listar = async(req: Request, res: Response) => {
    const livros = await livroRepository.find({ relations: ["autores"] });
    res.json(livros);
  }

  criar = async (req: Request, res: Response) => {
    const { titulo, anoPublicacao, genero, autorIds } = req.body;

    const autores = await autorRepository.findBy({ id: In(autorIds) });
    if (autores.length === 0) {
      return res.status(400).json({ mensagem: "Autores não encontrados" });
    }

    const livro = livroRepository.create({
      titulo,
      genero,
      anoPublicacao,
      autores,
    });

    await livroRepository.save(livro);
    res.status(201).json(livro);
  }

  buscarporId = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const livro = await livroRepository.findOne({
      where: { id },
      relations: ["autores"]
    });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
  }

  atualizar = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { titulo, genero, anoPublicacao, autorIds } = req.body;

    const livro = await livroRepository.findOne({
      where: { id },
      relations: ["autores"]
    });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    const autores = await autorRepository.findBy({ id: In(autorIds) });

    if (autores.length === 0) {
      return res.status(400).json({ mensagem: "Autores não encontrados" });
    }

    livro.titulo = titulo;
    livro.genero = genero;
    livro.anoPublicacao = anoPublicacao;
    livro.autores = autores;

    await livroRepository.save(livro);
    res.json(livro);
  }

  deletar = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const livro = await livroRepository.findOneBy({ id });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    await livroRepository.remove(livro);
    res.status(204).send();
  }
}
