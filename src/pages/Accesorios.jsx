// src/pages/Accesorios.jsx
import { useState, useEffect } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { inicializarBD } from '../data/db';

export default function Accesorios({ onAddToCart }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const bd = inicializarBD();
    const filtrados = bd.filter(prod => prod.categoria === 'Accesorios');
    setProductos(filtrados);
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <h2 className="mb-4 fw-bold border-bottom pb-2">Catálogo de Accesorios</h2>
      
      {productos.length === 0 ? (
        <Alert variant="info">No hay accesorios disponibles en este momento.</Alert>
      ) : (
        <Row>
          {productos.map(prod => (
            <Col key={prod.id} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard producto={prod} onAdd={onAddToCart} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}