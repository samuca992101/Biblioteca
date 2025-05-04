// src/entity/Autor.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Livro } from './Livro';

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToMany(() => Livro, livro => livro.autores)
  livros: Livro[];
}
