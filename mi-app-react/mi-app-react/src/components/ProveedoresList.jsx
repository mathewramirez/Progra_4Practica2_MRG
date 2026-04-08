import { useEffect, useState } from 'react';
import { getProveedores, deleteProveedor } from '../api/Proveedores';

function ProveedoresList({ onEdit }) {
  const [proveedores, setProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  async function cargarProveedores() {
    try {
      setCargando(true);
      setError(null);
      const data = await getProveedores();
      setProveedores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProveedores();
  }, []);

  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este proveedor?')) return;
    try {
      await deleteProveedor(id);
      await cargarProveedores();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p>Cargando proveedores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de proveedores</h2>
      {proveedores.length === 0 ? (
        <p>No hay proveedores registrados.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.empresa}</td>
                <td>{p.telefono}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={cargarProveedores}>Recargar</button>
    </div>
  );
}

export default ProveedoresList;