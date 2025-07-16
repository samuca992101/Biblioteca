import React, { useState } from 'react';
import axios from 'axios';

const CadastrarAutor = () => {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setMensagem('Informe o nome do autor!');
      return;
    }

    try {
      await axios.post('http://localhost:4000/autores', { nome });
      setMensagem('Autor cadastrado com sucesso!');
      setNome('');
    } catch (err: any) {
      setMensagem('Erro ao cadastrar autor: ' + (err.response?.data?.mensagem || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Autor</h2>
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Nome do autor"
        required
      />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default CadastrarAutor;
