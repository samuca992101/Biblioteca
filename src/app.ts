import express from "express";
import "reflect-metadata";
import livroRoutes from "./routes/LivroRouter";
import autorRoutes from "./routes/AutorRouter";
import editoraRouter from "./routes/EditoraRouter";
import path from "path";
const app = express();

app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Rotas
app.use("/livros", livroRoutes);
app.use("/autores", autorRoutes);
app.use("/editoras", editoraRouter);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
export default app;
