// src/pages/Busqueda.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { inicializarBD } from '../data/db';

export default function Busqueda({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const bd = inicializarBD();
    // Filtra ignorando mayúsculas y minúsculas
    const filtrados = bd.filter(prod => 
      prod.nombre.toLowerCase().includes(query.toLowerCase()) || 
      prod.categoria.toLowerCase().includes(query.toLowerCase())
    );
    setResultados(filtrados);
  }, [query]);

  return (
    <Container className="animate__animated animate__fadeIn">
      <h2 className="mb-4 fw-bold border-bottom pb-2">
        Resultados para: <span className="text-primary">"{query}"</span>
      </h2>
      
      {resultados.length === 0 ? (
        <Alert variant="warning">
          No encontramos productos que coincidan con tu búsqueda. Intenta con otros términos como "Gamer" o "Monitor".
        </Alert>
      ) : (
        <Row>
          {resultados.map(prod => (
            <Col key={prod.id} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard producto={prod} onAdd={onAddToCart} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}