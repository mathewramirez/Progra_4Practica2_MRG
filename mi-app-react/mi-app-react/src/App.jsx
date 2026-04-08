import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import InicioPage from './pages/InicioPage';
import UsuariosPage from './pages/UsuariosPage';
import ProductosPage from './pages/ProductosPage';
import ClientesPage from './pages/ClientesPage';
import ProveedoresPage from './pages/ProveedoresPage';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <Menu />
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/proveedores" element={<ProveedoresPage />} />
      </Routes>
    </div>
  );
}

export default App;