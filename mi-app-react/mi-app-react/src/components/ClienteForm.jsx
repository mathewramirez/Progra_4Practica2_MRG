import { useEffect, useState } from 'react';
import { createCliente, updateCliente } from '../api/Clientes';

const clienteInicial = {
  nombre: '',
  correo: '',
  telefono: '',
};


function ClienteForm({ clienteSeleccionado, onSuccess, onCancel }) {
  const [form, setForm] = useState(clienteInicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (clienteSeleccionado) {
      setForm({
        nombre: clienteSeleccionado.nombre ?? '',
        correo: clienteSeleccionado.correo ?? '',
        telefono: clienteSeleccionado.telefono ?? '',
      });
    } else {
      setForm(clienteInicial);
    }
  }, [clienteSeleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (clienteSeleccionado?.id) {
        await updateCliente(clienteSeleccionado.id, form);
      } else {
        await createCliente(form);
      }
      onSuccess();
      setForm(clienteInicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{clienteSeleccionado ? 'Editar cliente' : 'Nuevo cliente'}</h2>
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
            Correo:
            <input type="email" name="correo" value={form.correo} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input name="telefono" value={form.telefono} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : clienteSeleccionado ? 'Actualizar' : 'Crear'}
        </button>
        {clienteSeleccionado && (
          <button type="button" onClick={onCancel}>Cancelar edición</button>
        )}
      </form>
    </div>
  );
}

export default ClienteForm;