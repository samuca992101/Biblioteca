// src/pages/Dashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-12">
    <h1 className="text-3xl font-bold mb-8">Biblioteca - Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
      <Link
        to="/livros"
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
      >
        <span className="text-4xl mb-2">📚</span>
        <span className="text-lg font-semibold">Listar Livros</span>
      </Link>
      <Link
        to="/cadastrar-livro"
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
      >
        <span className="text-4xl mb-2">➕</span>
        <span className="text-lg font-semibold">Cadastrar Livro</span>
      </Link>
      <Link
        to="/emprestimos"
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
      >
        <span className="text-4xl mb-2">📖</span>
        <span className="text-lg font-semibold">Listar Empréstimos</span>
      </Link>
      <Link
        to="/cadastrar-emprestimo"
        className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
      >
        <span className="text-4xl mb-2">📝</span>
        <span className="text-lg font-semibold">Cadastrar Empréstimo</span>
      </Link>
        <Link
            to="/cadastrar-usuario"
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
          >
            <span className="text-4xl mb-2">👤</span>
            <span className="text-lg font-semibold">Cadastrar Usuário</span>
          </Link>
        <Link
            to="/cadastrar-autor"
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
          >
            <span className="text-4xl mb-2">✍️</span>
            <span className="text-lg font-semibold">Cadastrar Autor</span>
          </Link>
        <Link
            to="/cadastrar-editora"
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
          >
            <span className="text-4xl mb-2">🏢</span>
            <span className="text-lg font-semibold">Cadastrar Editora</span>
          </Link>
          {/* <Link to={`/editar-emprestimo/${emp.id}`}>Editar</Link> */}
        <Link 
            to="/editar-emprestimo/1"
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center hover:shadow-2xl transition"
          >
            <span className="text-4xl mb-2">✏️</span>
            <span className="text-lg font-semibold">Editar Empréstimo</span>
          </Link>
    </div>
  </div>
);

export default Dashboard;
