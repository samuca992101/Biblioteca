// src/index.ts
import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados!");
    app.listen(4000, () => {
      console.log("Servidor rodando na porta 4000");
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
  });
 