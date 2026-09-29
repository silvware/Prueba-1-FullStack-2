// src/components/ProductCard.jsx
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
// Importamos el Modal que ya tenías creado
import ProductModal from './ProductModal'; 

export default function ProductCard({ producto, onAdd }) {
  // Estado para controlar si el modal está abierto o cerrado
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="h-100 shadow-sm border-0 text-center p-3 animate__animated animate__fadeInUp">
        <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="mb-3">
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        
        <Card.Body className="d-flex flex-column p-0">
          <Card.Title className="fw-bold bg-primary text-white py-1 rounded fs-6 mb-2">
            {producto.nombre}
          </Card.Title>
          <Card.Text className="text-muted small mb-2">
            Stock disponible: {producto.stock} unids.
          </Card.Text>
          <Card.Text className="text-primary fw-bold fs-5 mb-3">
            ${producto.precio.toLocaleString('es-CL')}
          </Card.Text>
          
          <div className="mt-auto">
            {/* Le agregamos el evento onClick para abrir el modal */}
            <Button variant="outline-secondary" size="sm" className="w-100 mb-2" onClick={() => setShowModal(true)}>
              Ver detalles
            </Button>
            <Button variant="outline-primary" size="sm" className="w-100" onClick={() => onAdd(producto)}>
              Añadir al carrito
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Renderizamos el Modal de detalles */}
      <ProductModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        producto={producto} 
        onAdd={onAdd} 
      />
    </>
  );
}