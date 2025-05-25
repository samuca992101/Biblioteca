import { editoraRepository } from "../repositories/EditoraRepository";
import { Request, Response } from "express";

export class EditoraController {
  listar = async (req: Request, res: Response) => {
    const editoras = await editoraRepository.find({ relations: ["livros"] });
    res.json(editoras);
  };

  criar = async (req: Request, res: Response) => {
    const { nome } = req.body;
    const editora = editoraRepository.create({ nome });
    await editoraRepository.save(editora);
    res.status(201).json(editora);
  };

  buscarporId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const editora = await editoraRepository.findOne({
      where: { id },
      relations: ["livros"],
    });

    if (!editora) {
      return res.status(404).json({ mensagem: "Editora não encontrada" });
    }
    res.json(editora);
  };

  atualizar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome } = req.body;
    const editora = await editoraRepository.findOne({
      where: { id },
      relations: ["livros"],
    });

    if (!editora) {
      return res.status(404).json({ mensagem: "Editora não encontrada" });
    }

    editora.nome = nome;
    await editoraRepository.save(editora);
    res.json(editora);
  };

  deletar = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const editora = await editoraRepository.findOneBy({ id });

    if (!editora) {
      return res.status(404).json({ mensagem: "Editora não encontrada" });
    }

    await editoraRepository.remove(editora);
    res.status(204).send();
  };
}
