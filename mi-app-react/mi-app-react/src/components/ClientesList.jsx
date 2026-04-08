import { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../api/Clientes';

function ClientesList({ onEdit }) {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  async function cargarClientes() {
    try {
      setCargando(true);
      setError(null);
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
    try {
      await deleteCliente(id);
      await cargarClientes();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p>Cargando clientes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de clientes</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>{c.telefono}</td>
                <td>
                  <button onClick={() => onEdit(c)}>Editar</button>
                  <button onClick={() => handleDelete(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={cargarClientes}>Recargar</button>
    </div>
  );
}

export default ClientesList;