import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Emprestimo {
  id: number;
  usuario: { id: number; nome: string };
  livro: { id: number; titulo: string };
  dataEmprestimo: string;
  dataDevolucao: string | null;
}

const EditarEmprestimo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<{ id: number; nome: string }[]>([]);
  const [livros, setLivros] = useState<{ id: number; titulo: string }[]>([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [livroId, setLivroId] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca listas de usuários e livros
    axios.get<{ id: number; nome: string }[]>("http://localhost:4000/usuarios").then(res => setUsuarios(res.data));
    axios.get<{ id: number; titulo: string }[]>("http://localhost:4000/livros").then(res => setLivros(res.data));

    // Busca dados do empréstimo pelo ID
    axios.get<Emprestimo>(`http://localhost:4000/emprestimos/${id}`).then(res => {
      const emp = res.data;
      setUsuarioId(emp.usuario?.id?.toString() || "");
      setLivroId(emp.livro?.id?.toString() || "");
      setDataEmprestimo(emp.dataEmprestimo?.slice(0, 10) || "");
      setDataDevolucao(emp.dataDevolucao?.slice(0, 10) || "");
      setLoading(false);
    }).catch(() => {
      setMensagem("Erro ao carregar empréstimo!");
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/emprestimos/${id}`, {
        usuarioId: parseInt(usuarioId, 10),
        livroId: parseInt(livroId, 10),
        dataEmprestimo,
        dataDevolucao: dataDevolucao || null
      });
      setMensagem("Empréstimo atualizado com sucesso!");
      setTimeout(() => navigate("/emprestimos"), 1200);
    } catch (err: any) {
      setMensagem("Erro ao atualizar empréstimo.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "30px auto", padding: 20, background: "#fff", borderRadius: 12 }}>
      <h2>Editar Empréstimo</h2>
      <div>
        <label>Usuário:</label>
        <select value={usuarioId} onChange={e => setUsuarioId(e.target.value)} required>
          <option value="">Selecione um usuário</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Livro:</label>
        <select value={livroId} onChange={e => setLivroId(e.target.value)} required>
          <option value="">Selecione um livro</option>
          {livros.map(l => (
            <option key={l.id} value={l.id}>{l.titulo}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Data Empréstimo:</label>
        <input
          type="date"
          value={dataEmprestimo}
          onChange={e => setDataEmprestimo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data Devolução:</label>
        <input
          type="date"
          value={dataDevolucao || ""}
          onChange={e => setDataDevolucao(e.target.value)}
        />
      </div>
      <button type="submit">Salvar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default EditarEmprestimo;
