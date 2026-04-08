// src/components/ProductosList.jsx
import { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../api/productos';

function ProductosList({ onEdit }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  
  async function cargarProductos() {
    try {
      setCargando(true);
      setError(null);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  async function handleDelete(id) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      await cargarProductos();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={cargarProductos}>Recargar</button>
    </div>
  );
}

export default ProductosList;