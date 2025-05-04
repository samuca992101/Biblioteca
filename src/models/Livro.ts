// src/entity/Livro.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Autor } from './Autor';

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  anoPublicacao: number;

  @Column() 
  genero: string;

  @Column()
  autor: string;


  @ManyToMany(() => Autor, autor => autor.livros)
  @JoinTable() // Esta anotação deve ficar em um dos lados da relação (normalmente no dono da relação)
  autores: Autor[];
}
