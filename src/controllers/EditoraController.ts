import { Request, Response } from "express";
import { EditoraService } from "../service/EditoraService";

export class EditoraController {
  listar = async (req: Request, res: Response) => {
    const editoras = await EditoraService.listar();
    return res.json(editoras);
  };

  criar = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const editora = await EditoraService.criar(nome);
    return res.status(201).json(editora);
  };

  buscarporId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const editora = await EditoraService.buscarPorId(id);

    if (!editora) {
      return res.status(404).json({ mensagem: "Editora não encontrada" });
    }

    return res.json(editora);
  };

  atualizar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    try {
      const editora = await EditoraService.atualizar(id, nome);
      return res.json(editora);
    } catch (error: any) {
      return res.status(404).json({ mensagem: error.message });
    }
  };

  deletar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await EditoraService.deletar(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ mensagem: error.message });
    }
  };
}
