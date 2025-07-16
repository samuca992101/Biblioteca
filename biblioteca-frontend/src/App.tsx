import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Livros from './pages/livros';
import CadastrarLivro from './pages/CadastrarLivros';
import CadastrarEditora from './pages/CadastrarEditora';
import CadastrarAutor from './pages/CadastrarAutor';
import CadastrarUsuario from './pages/CadastrarUsuario';
import EditarLivro from './pages/EditarLivro';
import CadastrarEmprestimo from './pages/CadastrarEmprestimo';
import Dashboard from './pages/Dashboard';
import ListarEmprestimos from './pages/ListarEmprestimos';
import EditarEmprestimo from './pages/EditarEmprestimo';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/cadastrar-livro" element={<CadastrarLivro />} />
        <Route path="/cadastrar-editora" element={<CadastrarEditora />} />
        <Route path="/cadastrar-autor" element={<CadastrarAutor />} />
        <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
        <Route path="/editar-livro/:id" element={<EditarLivro />} />
        <Route path="/cadastrar-emprestimo" element={<CadastrarEmprestimo />} />
        <Route path="/emprestimos" element={<ListarEmprestimos />} />
        <Route path="/editar-emprestimo/:id" element={<EditarEmprestimo />} />
      </Routes>
    </Router>
  );
}

export default App;
