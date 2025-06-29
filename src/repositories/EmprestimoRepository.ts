import {Emprestimo} from '../models/Emprestimo';
import { EntityRepository, Repository } from "typeorm";

import { AppDataSource } from '../data-source';

export const emprestimoRepository = AppDataSource.getRepository(Emprestimo);