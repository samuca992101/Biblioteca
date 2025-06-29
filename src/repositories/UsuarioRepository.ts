import {Usuario} from '../models/Usuario';
import { EntityRepository, Repository } from "typeorm";
import { AppDataSource } from '../data-source';

export const usuarioRepository = AppDataSource.getRepository(Usuario);