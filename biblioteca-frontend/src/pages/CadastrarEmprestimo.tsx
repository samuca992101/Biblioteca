import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarEmprestimo = () => {
  const [usuario, setUsuario] = useState('');
  const [livro, setLivro] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [usuarios, setUsuarios] = useState<{ id: number, nome: string }[]>([]);
  const [livros, setLivros] = useState<{ id: number, titulo: string }[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get<{ id: number, nome: string }[]>('http://localhost:4000/usuarios').then(res => setUsuarios(res.data));
    axios.get<{ id: number, titulo: string }[]>('http://localhost:4000/livros').then(res => setLivros(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioId = parseInt(usuario, 10);
    const livroId = parseInt(livro, 10);

    if (!usuarioId) {
      setMensagem('Selecione o usuário!');
      return;
    }
    if (!livroId) {
      setMensagem('Selecione o livro!');
      return;
    }

    const payload = {
      usuarioId,
      livroId,
      dataDevolucao: dataDevolucao || undefined
    };

    try {
      await axios.post('http://localhost:4000/emprestimos', payload);
      setMensagem('Empréstimo cadastrado com sucesso!');
      setUsuario('');
      setLivro('');
      setDataDevolucao('');
    } catch (err: any) {
      setMensagem('Erro ao cadastrar empréstimo: ' + (err.response?.data?.mensagem || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Empréstimo</h2>

      <div>
        <label>Usuário:</label>
        <select value={usuario} onChange={e => setUsuario(e.target.value)} required>
          <option value="">Selecione o usuário</option>
          {usuarios.map(u => (
            <option key={u.id} value={u.id}>{u.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Livro:</label>
        <select value={livro} onChange={e => setLivro(e.target.value)} required>
          <option value="">Selecione o livro</option>
          {livros.map(l => (
            <option key={l.id} value={l.id}>{l.titulo}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Data de Devolução:</label>
        <input type="date" value={dataDevolucao} onChange={e => setDataDevolucao(e.target.value)} />
      </div>

      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default CadastrarEmprestimo;
