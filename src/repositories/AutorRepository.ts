import { AppDataSource } from "../data-source";
import { Autor } from "../models/Autor";

export const autorRepository = AppDataSource.getRepository(Autor);
