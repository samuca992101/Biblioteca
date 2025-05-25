import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Livro } from './Livro';

@Entity()
export class Editora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Livro, livro => livro.editora)
  livros: Livro[];
}