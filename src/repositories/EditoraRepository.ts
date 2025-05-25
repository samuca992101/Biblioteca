import { AppDataSource } from "../data-source";
import { Editora } from "../models/Editora";

export const editoraRepository = AppDataSource.getRepository(Editora);