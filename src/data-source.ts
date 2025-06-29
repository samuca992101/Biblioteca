import "reflect-metadata"
import { DataSource } from "typeorm"
import { Livro } from "./models/Livro"
import { Autor } from "./models/Autor"
import { Editora } from "./models/Editora"
import { Usuario } from "./models/Usuario"
import { Emprestimo } from "./models/Emprestimo"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "biblioteca",
    synchronize: true,
    logging: false,
    entities: [Livro, Autor, Editora, Usuario, Emprestimo],
    migrations: [],
    subscribers: [],
})
