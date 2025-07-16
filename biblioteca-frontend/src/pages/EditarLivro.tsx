import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Interface para tipar a resposta da API
interface Livro {
  id: number;
  titulo: string;
  anoPublicacao: number;
  genero: string;
  capaUrl?: string;
  autores: { id: number; nome: string }[];
  editora: { id: number; nome: string } | null;
}

const EditarLivro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // States dos campos do formulário
  const [titulo, setTitulo] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [genero, setGenero] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [listaAutores, setListaAutores] = useState<{ id: number; nome: string }[]>([]);
  const [listaEditoras, setListaEditoras] = useState<{ id: number; nome: string }[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    // Carrega autores e editoras
    axios.get<{ id: number; nome: string }[]>('http://localhost:4000/autores').then(res => setListaAutores(res.data));
    axios.get<{ id: number; nome: string }[]>('http://localhost:4000/editoras').then(res => setListaEditoras(res.data));
    // Carrega dados do livro
    axios.get<Livro>(`http://localhost:4000/livros/${id}`).then(res => {
      const livro = res.data;
      setTitulo(livro.titulo);
      setAnoPublicacao(livro.anoPublicacao.toString());
      setGenero(livro.genero);
      setCapaUrl(livro.capaUrl || '');
      setAutor(livro.autores[0]?.id?.toString() || '');
      setEditora(livro.editora?.id?.toString() || '');
    });
  }, [id]);

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
      autorIds: [idAutor],   // deve ser exatamente este nome!
      editoraId: idEditora,  // deve ser exatamente este nome!
    };

    try {
      await axios.put(`http://localhost:4000/livros/${id}`, payload);
      setMensagem('Livro atualizado com sucesso!');
      setTimeout(() => navigate('/livros'), 1200);
    } catch (err: any) {
      setMensagem('Erro ao atualizar livro: ' + (err.response?.data?.mensagem || 'Erro desconhecido'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Livro</h2>
      <input
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        value={anoPublicacao}
        onChange={e => setAnoPublicacao(e.target.value)}
        placeholder="Ano de Publicação"
        type="number"
        required
      />
      <input
        value={genero}
        onChange={e => setGenero(e.target.value)}
        placeholder="Gênero"
        required
      />
      <input
        value={capaUrl}
        onChange={e => setCapaUrl(e.target.value)}
        placeholder="URL da capa"
      />

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

      <button type="submit">Salvar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default EditarLivro;
