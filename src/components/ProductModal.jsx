// src/components/ProductModal.jsx
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default function ProductModal({ show, onHide, producto, onAdd }) {
  // Si no hay producto seleccionado, no renderizamos nada
  if (!producto) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="align-items-center">
          <Col md={5} className="text-center mb-3 mb-md-0">
            <img 
              src={producto.imagen} 
              className="img-fluid rounded shadow-sm bg-light p-2" 
              alt={producto.nombre} 
              style={{ maxHeight: '300px', objectFit: 'contain' }} 
            />
          </Col>
          <Col md={7}>
            <h3 className="text-primary fw-bold mb-3">${producto.precio.toLocaleString('es-CL')}</h3>
            <p className="text-muted">
              Excelente equipo recomendado para tareas de alta exigencia y uso diario. Cuenta con garantía directa de Think-Tech y soporte técnico especializado.
            </p>
            <h6><strong>Especificaciones principales:</strong></h6>
            <ul className="small text-muted">
              <li>Stock actual: <strong>{producto.stock} unidades disponibles</strong></li>
              <li>Categoría: {producto.categoria === 'pc' ? 'Computadoras' : 'Accesorios'}</li>
              <li>Despacho disponible a todo Chile</li>
            </ul>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cerrar</Button>
        <Button 
          variant="primary" 
          onClick={() => {
            onAdd(producto); // Agrega al carrito y lanza la notificación Toast
            onHide();        // Cierra el modal automáticamente
          }}
        >
          Añadir al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}