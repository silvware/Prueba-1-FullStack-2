// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { inicializarBD } from '../data/db';

export default function Home({ onAddToCart }) {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const bd = inicializarBD(); 
    setProductosDestacados(bd.slice(0, 4));
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          Bienvenid@ a <span className="text-primary text-decoration-underline">Think-Tech:</span>
        </h1>
        <p className="text-muted">¡La mejor tienda de computadoras de Chile!</p>
      </div>

      <Carousel className="mb-5 shadow-sm rounded overflow-hidden">
        {/* Primera imagen del carrusel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/resources/indeximg1.avif"
            alt="Profesional usando Think-Tech"
            style={{ height: '400px', objectFit: 'cover', filter: 'brightness(0.6)' }}
          />
          <Carousel.Caption className="pb-5">
            <h3 className="fw-bold lh-base">
              Think-Tech es una tienda<br/>
              de computadoras orientada al publico<br/>
              general y empresarial de alta fidelidad.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
        
        {/* Segunda imagen del carrusel */}
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/resources/indeximg2.avif"
            alt="Stock de computadoras HP"
            style={{ height: '400px', objectFit: 'cover', filter: 'brightness(0.6)' }}
          />
          <Carousel.Caption className="pb-5">
            <h3 className="fw-bold lh-base">
              Nuestras computadoras vienen nuevas<br/>
              y restauradas por técnicos especializados.
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="bg-secondary text-white text-center py-2 mb-4 rounded shadow-sm">
        <h4 className="m-0 fw-bold">Productos más vendidos</h4>
      </div>

      <Row>
        {productosDestacados.map(prod => (
          <Col key={prod.id} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard producto={prod} onAdd={onAddToCart} />
          </Col>
        ))}
      </Row>
    </div>
  );
}