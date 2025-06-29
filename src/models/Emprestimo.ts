import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm';
import {Usuario} from './Usuario';
import {Livro} from './Livro';

@Entity()
export class Emprestimo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, usuario => usuario.emprestimos)
    usuario: Usuario;

    @CreateDateColumn()
    dataEmprestimo: Date;

    @Column({ nullable: true })
    dataDevolucao: Date | null;

    @ManyToOne(() => Livro, livro => livro.emprestimos)
    livro: Livro;
}