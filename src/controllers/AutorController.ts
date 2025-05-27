import { Request, Response } from "express";
import { AutorService } from "../service/AutorService";

export class AutorController {
  listarTodos = async (req: Request, res: Response) => {
    try {
      const autores = await AutorService.listarTodos();
      return res.json(autores);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao listar autores." });
    }
  };

  criar = async (req: Request, res: Response) => {
    const { nome } = req.body;

    try {
      const autor = await AutorService.criar(nome);
      return res.status(201).json(autor);
    } catch (error: any) {
      return res.status(error.status || 500).json({ mensagem: error.message });
    }
  };

  buscarPorId = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const autor = await AutorService.buscarPorId(Number(id));
      return res.json(autor);
    } catch (error: any) {
      return res.status(error.status || 500).json({ mensagem: error.message });
    }
  };

  atualizar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const autorAtualizado = await AutorService.atualizar(Number(id), nome);
      return res.json(autorAtualizado);
    } catch (error: any) {
      return res.status(error.status || 500).json({ mensagem: error.message });
    }
  };

  remover = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await AutorService.remover(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(error.status || 500).json({ mensagem: error.message });
    }
  };
}
