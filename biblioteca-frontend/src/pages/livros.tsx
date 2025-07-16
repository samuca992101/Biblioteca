import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Autor {
  id: number;
  nome: string;
}

interface Editora {
  id: number;
  nome: string;
}

interface Livro {
  id: number;
  titulo: string;
  anoPublicacao: number;
  genero: string;
  capaUrl: string | null;
  autores: Autor[];
  editora: Editora | null;
}

const API_URL = 'http://localhost:4000';

export default function Livros() {
  const [livros, setLivros] = useState<Livro[]>([]);

useEffect(() => {
  axios.get<Livro[]>(`${API_URL}/livros`)
    .then(response => {
      console.log("Livros recebidos:", response.data);
      setLivros(response.data); // agora TypeScript reconhece como Livro[]
    })
    .catch(error => console.error("Erro ao buscar livros:", error));
}, []);


  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Livros</h1>
      {livros.map(livro => (
        <div key={livro.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px', borderRadius: '8px' }}>
          <h2>{livro.titulo}</h2>
          <p><strong>Gênero:</strong> {livro.genero}</p>
          <p><strong>Ano:</strong> {livro.anoPublicacao}</p>
          <p><strong>Autores:</strong> {livro.autores.map(autor => autor.nome).join(', ')}</p>
          <p><strong>Editora:</strong> {livro.editora ? livro.editora.nome : 'Não informada'}</p>
          {livro.capaUrl && (
            <img
              src={`http://localhost:4000${livro.capaUrl}`}
              alt={`Capa do livro ${livro.titulo}`}
              style={{ width: '150px', marginTop: '10px', borderRadius: '4px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
