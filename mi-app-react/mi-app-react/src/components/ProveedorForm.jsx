import { useEffect, useState } from 'react';
import { createProveedor, updateProveedor } from '../api/Proveedores';

const proveedorInicial = {
  nombre: '',
  empresa: '',
  telefono: '',
};

function ProveedorForm({ proveedorSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(proveedorInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (proveedorSeleccionado) {
      setForm({
        nombre: proveedorSeleccionado.nombre ?? '',
        empresa: proveedorSeleccionado.empresa ?? '',
        telefono: proveedorSeleccionado.telefono ?? '',
      });
    } else {
      setForm(proveedorInicial);
    }
  }, [proveedorSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (proveedorSeleccionado?.id) {
        await updateProveedor(proveedorSeleccionado.id, form);
      } else {
        await createProveedor(form);
      }
      onSuccess();
      setForm(proveedorInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{proveedorSeleccionado ? 'Editar proveedor' : 'Nuevo proveedor'}</h2>
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
            Empresa:
            <input name="empresa" value={form.empresa} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input name="telefono" value={form.telefono} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : proveedorSeleccionado ? 'Actualizar' : 'Crear'}
        </button>
        {proveedorSeleccionado && (
          <button type="button" onClick={onCancel}>Cancelar edición</button>
        )}
      </form>
    </div>
  );
}

export default ProveedorForm;