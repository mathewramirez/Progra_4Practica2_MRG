// src/components/ProductoForm.jsx
import { useEffect, useState } from 'react';
import { createProducto, updateProducto } from '../api/productos';

const productoInicial = {
  nombre: '',
  precio: '',
  stock: '',
};


function ProductoForm({ productoSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(productoInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productoSeleccionado) {
      setForm({
        nombre: productoSeleccionado.nombre ?? '',
        precio: productoSeleccionado.precio ?? '',
        stock: productoSeleccionado.stock ?? '',
      });
    } else {
      setForm(productoInicial);
    }
  }, [productoSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (productoSeleccionado?.id) {
        await updateProducto(productoSeleccionado.id, form);
      } else {
        await createProducto(form);
      }
      onSuccess();
      setForm(productoInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{productoSeleccionado ? 'Editar producto' : 'Nuevo producto'}</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Precio:
            <input type="number" name="precio" value={form.precio} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Stock:
            <input type="number" name="stock" value={form.stock} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : productoSeleccionado ? 'Actualizar' : 'Crear'}
        </button>
        {productoSeleccionado && (
          <button type="button" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}

export default ProductoForm;