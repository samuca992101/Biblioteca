import { AppDataSource } from "../service/data-source";
import { Livro } from "../models/Livro";

export const livroRepository = AppDataSource.getRepository(Livro);
