import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Emprestimo {
  id: number;
  usuario: { id: number; nome: string };
  livro: { id: number; titulo: string };
  dataEmprestimo: string;
  dataDevolucao: string | null;
}

const ListarEmprestimos: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get<Emprestimo[]>('http://localhost:4000/emprestimos')
      .then(res => {
        setEmprestimos(res.data);
        setLoading(false);
      })
      .catch(err => {
        setErro('Erro ao buscar empréstimos!');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <h2>Empréstimos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Livro</th>
            <th>Data Empréstimo</th>
            <th>Data Devolução</th>
            <th>Ações</th> {/* nova coluna */}
          </tr>
        </thead>
        <tbody>
          {emprestimos.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.usuario ? emp.usuario.nome : <span style={{ color: "red" }}>Não informado</span>}</td>
              <td>{emp.livro ? emp.livro.titulo : <span style={{ color: "red" }}>Não informado</span>}</td>
              <td>{new Date(emp.dataEmprestimo).toLocaleDateString()}</td>
              <td>
                {emp.dataDevolucao
                  ? new Date(emp.dataDevolucao).toLocaleDateString()
                  : <span style={{ color: 'red' }}>Pendente</span>
                }
              </td>
              <td>
                <Link
                  to={`/editar-emprestimo/${emp.id}`}
                  className="text-blue-600 hover:underline"
                  style={{ marginRight: 8 }}
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" style={{ display: 'block', marginTop: 24 }}>🏠 Voltar ao Dashboard</Link>
    </div>
  );
};

export default ListarEmprestimos;
