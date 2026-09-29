// src/pages/Computadoras.jsx
import { useState, useEffect } from 'react';
import { Row, Col, Alert, Carousel } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { inicializarBD } from '../data/db';

export default function Computadoras({ onAddToCart }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const bd = inicializarBD();
    const filtrados = bd.filter(prod => prod.categoria === 'Computadoras');
    setProductos(filtrados);
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      
      <Carousel className="mb-5 shadow-sm rounded overflow-hidden">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/resources/macbookm3.jpg"
            alt="Línea Premium"
            style={{ height: '350px', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
          <Carousel.Caption className="pb-4">
            <h2 className="fw-bold shadow-text">Diseño Premium</h2>
            <p>Descubre los ultrabooks más avanzados y ligeros del mercado.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/resources/asus.png"
            alt="Línea Gamer"
            style={{ height: '350px', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
          <Carousel.Caption className="pb-4">
            <h2 className="fw-bold shadow-text">Equipos Gamer</h2>
            <p>Máxima potencia gráfica para tus sesiones competitivas.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/resources/dell.jpg"
            alt="Línea Profesional"
            style={{ height: '350px', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
          <Carousel.Caption className="pb-4">
            <h2 className="fw-bold shadow-text">Estaciones de Trabajo</h2>
            <p>Rendimiento absoluto para profesionales y empresas exigentes.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="mb-4 fw-bold border-bottom pb-2">Catálogo de Computadoras</h2>
      
      {productos.length === 0 ? (
        <Alert variant="info">No hay computadoras disponibles en este momento.</Alert>
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