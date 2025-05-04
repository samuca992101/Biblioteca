import { Request, Response } from "express";
import { livroRepository } from "../repositories/LivroRepository";
import { Livro } from "../models/Livro";

export class LivroController {
  async listar(req: Request, res: Response) {
    const livros = await livroRepository.find();
    res.json(livros);
  }

  async criar(req: Request, res: Response) {
    const { titulo, autor, genero, anoPublicacao } = req.body;

    const livro = livroRepository.create({
      titulo,
      autor,
      genero,
      anoPublicacao,
    });

    await livroRepository.save(livro);
    res.status(201).json(livro);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const livro = await livroRepository.findOneBy({ id });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { titulo, autor, genero, anoPublicacao } = req.body;

    const livro = await livroRepository.findOneBy({ id });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.genero = genero;
    livro.anoPublicacao = anoPublicacao;

    await livroRepository.save(livro);
    res.json(livro);
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const livro = await livroRepository.findOneBy({ id });

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    await livroRepository.remove(livro);
    res.status(204).send();
  }
}
