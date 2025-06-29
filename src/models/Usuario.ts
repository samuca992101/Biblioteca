import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Emprestimo} from './Emprestimo';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Emprestimo, emprestimo => emprestimo.usuario)
    emprestimos: Emprestimo[];

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;
}