import React, { useState } from 'react';
import axios from 'axios';

const CadastrarEditora = () => {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setMensagem('Informe o nome da editora!');
      return;
    }

    try {
      await axios.post('http://localhost:4000/editoras', { nome });
      setMensagem('Editora cadastrada com sucesso!');
      setNome('');
    } catch (err: any) {
      setMensagem('Erro ao cadastrar editora: ' + (err.response?.data?.mensagem || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Editora</h2>
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Nome da editora"
        required
      />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default CadastrarEditora;
