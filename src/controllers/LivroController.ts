// src/controllers/LivroController.ts
import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
  listar = async (req: Request, res: Response) => {
    const livros = await LivroService.listar();
    res.json(livros);
  };

  criar = async (req: Request, res: Response) => {
    try {
      const livro = await LivroService.criar(req.body);
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(400).json({ mensagem: error.message });
    }
  };

  buscarPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const livro = await LivroService.buscarPorId(id);

    if (!livro) {
      return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
  };

  atualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const livro = await LivroService.atualizar(id, req.body);
      res.json(livro);
    } catch (error: any) {
      res.status(400).json({ mensagem: error.message });
    }
  };

  deletar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await LivroService.deletar(id);
    res.status(204).send();
  };
    public async uploadCapa(req: Request, res: Response) {
    const livroId = parseInt(req.params.id);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ erro: "Nenhuma imagem enviada" });
    }

    try {
      const livroAtualizado = await LivroService.salvarCapa(livroId, file.filename);

      if (!livroAtualizado) {
        return res.status(404).json({ erro: "Livro não encontrado" });
      }

      return res.status(200).json({ mensagem: "Capa atualizada", livro: livroAtualizado });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao salvar a capa", detalhe: error });
    }

}};
