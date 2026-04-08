import { useState } from 'react';
import ProductosList from '../components/ProductosList';
import ProductoForm from '../components/ProductoForm';

function ProductosPage() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(producto) {
    setProductoSeleccionado(producto);
  }

  function handleSuccess() {
    setProductoSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setProductoSeleccionado(null);
  }

  return (
    <div>
      <h1>Módulo de productos</h1>
      <ProductoForm
        productoSeleccionado={productoSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      <ProductosList key={recargarLista} onEdit={handleEdit} />
    </div>
  );
}

export default ProductosPage;