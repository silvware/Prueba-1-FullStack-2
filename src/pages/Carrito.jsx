// src/pages/Carrito.jsx
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Carrito({ cart, onRemove }) {
  // Calculamos el total sumando los precios de todos los productos en el carro
  const total = cart.reduce((acumulador, producto) => acumulador + producto.precio, 0);

  return (
    <div className="animate__animated animate__fadeIn">
      <h2 className="mb-4 fw-bold">Mi carrito de compras</h2>
      
      <Row>
        {/* COLUMNA IZQUIERDA: Lista de productos */}
        <Col lg={8}>
          {cart.length === 0 ? (
            <div className="text-center py-5 bg-light rounded shadow-sm border-0">
              <h4 className="text-muted">Tu carrito está vacío</h4>
              <Button as={Link} to="/pc" variant="outline-primary" className="mt-3">
                Ver catálogo
              </Button>
            </div>
          ) : (
            <ListGroup className="shadow-sm mb-4 border-0">
              {cart.map((producto, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center p-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <img 
                      src={producto.imagen} 
                      alt={producto.nombre} 
                      style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
                      className="me-3 bg-light rounded p-1" 
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{producto.nombre}</h6>
                      <small className="text-muted">${producto.precio.toLocaleString('es-CL')}</small>
                    </div>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => onRemove(index)}>
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        {/* COLUMNA DERECHA: Resumen de Compra */}
        <Col lg={4}>
          <Card className="bg-light border-0 shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="mb-4 fw-bold">Resumen</Card.Title>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Total a pagar:</span>
                <strong className="fs-4 text-primary">${total.toLocaleString('es-CL')}</strong>
              </div>
              <hr />
              <Button 
                variant="success" 
                className="w-100 fw-bold py-2 mt-3" 
                disabled={cart.length === 0}
              >
                PAGAR AHORA
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}