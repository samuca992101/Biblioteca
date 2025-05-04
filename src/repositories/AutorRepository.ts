import { AppDataSource } from "../service/data-source";
import { Autor } from "../models/Autor";

export const autorRepository = AppDataSource.getRepository(Autor);
