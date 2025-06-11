// src/entity/Livro.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Autor } from './Autor';
import { Editora } from './Editora';

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
  
  @Column({ nullable: true })
  capaUrl: string;



  @ManyToMany(() => Autor, autor => autor.livros)
  @JoinTable() // Esta anotação deve ficar em um dos lados da relação (normalmente no dono da relação)
  autores: Autor[];

  @ManyToOne(() => Editora, editora => editora.livros)
  editora: Editora;
}
