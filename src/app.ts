import express from "express";
import "reflect-metadata";
import livroRoutes from "./routes/LivroRouter";
import autorRoutes from "./routes/AutorRouter";
import editoraRouter from "./routes/EditoraRouter";
import emprestimoRoutes from "./routes/EmprestimoRouter";
import usuarioRoutes from "./routes/UsuarioRouter";
import path from "path";
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
// Rotas de API
app.use("/livros", livroRoutes);
app.use("/autores", autorRoutes);
app.use("/editoras", editoraRouter);
app.use("/emprestimos", emprestimoRoutes);
app.use("/usuarios", usuarioRoutes);

// Arquivos estáticos de upload
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

export default app;