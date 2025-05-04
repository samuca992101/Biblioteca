import { DataSource } from "typeorm";
import { Livro } from "./src/models/Livro"; // caminho relativo

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "seu_usuario",
  password: "sua_senha",
  database: "biblioteca",
  synchronize: true,
  logging: true,
  entities: [Livro],
});
