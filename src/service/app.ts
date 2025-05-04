import express from "express";
import "reflect-metadata";
import livroRoutes from "../routes/LivroRouter";
import autorRoutes from "../routes/AutorRouter";

const app = express();

app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Rotas
app.use("/livros", livroRoutes);
app.use("/autores", autorRoutes);

export default app;
