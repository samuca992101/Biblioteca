import React, { useState } from 'react';
import axios from 'axios';

const CadastrarUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    try {
      await axios.post('http://localhost:4000/usuarios', {
        nome,
        email,
        senha,
      });
      setMensagem('Usuário cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
    } catch (err: any) {
      setMensagem('Erro ao cadastrar usuário: ' + (err.response?.data?.mensagem || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Usuário</h2>
      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Nome"
        required
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail"
        type="email"
        required
      />
      <input
        value={senha}
        onChange={e => setSenha(e.target.value)}
        placeholder="Senha"
        type="password"
        required
      />
      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default CadastrarUsuario;
