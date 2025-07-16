import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarLivro = () => {
  const [titulo, setTitulo] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [genero, setGenero] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [autor, setAutor] = useState(''); // apenas um autor
  const [editora, setEditora] = useState('');
  const [listaAutores, setListaAutores] = useState<{id: number, nome: string}[]>([]);
  const [listaEditoras, setListaEditoras] = useState<{id: number, nome: string}[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get<{id: number, nome: string}[]>('http://localhost:4000/autores')
      .then(res => setListaAutores(res.data));
    axios.get<{id: number, nome: string}[]>('http://localhost:4000/editoras')
      .then(res => setListaEditoras(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idAutor = parseInt(autor, 10);
    const idEditora = parseInt(editora, 10);

    if (!idAutor) {
      setMensagem('Selecione um autor!');
      return;
    }
    if (!idEditora) {
      setMensagem('Selecione uma editora!');
      return;
    }

    const payload = {
      titulo,
      anoPublicacao: parseInt(anoPublicacao, 10),
      genero,
      capaUrl,
      autorIds: [idAutor],    // <-- nome correto!
      editoraId: idEditora,
    };

    console.log('Payload enviado:', payload);

    try {
      await axios.post('http://localhost:4000/livros', payload);
      setMensagem('Livro cadastrado com sucesso!');
      setTitulo('');
      setAnoPublicacao('');
      setGenero('');
      setCapaUrl('');
      setAutor('');
      setEditora('');
    } catch (err: any) {
      setMensagem('Erro ao cadastrar livro: ' + (err.response?.data?.mensagem || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Livro</h2>
      <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título" required />
      <input value={anoPublicacao} onChange={e => setAnoPublicacao(e.target.value)} placeholder="Ano de Publicação" type="number" required />
      <input value={genero} onChange={e => setGenero(e.target.value)} placeholder="Gênero" required />
      <input value={capaUrl} onChange={e => setCapaUrl(e.target.value)} placeholder="URL da capa" />

      <div>
        <label>Autor:</label>
        <select value={autor} onChange={e => setAutor(e.target.value)} required>
          <option value="">Selecione um autor</option>
          {listaAutores.map(a => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Editora:</label>
        <select value={editora} onChange={e => setEditora(e.target.value)} required>
          <option value="">Selecione uma editora</option>
          {listaEditoras.map(e => (
            <option key={e.id} value={e.id}>{e.nome}</option>
          ))}
        </select>
      </div>

      <button type="submit">Cadastrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default CadastrarLivro;
