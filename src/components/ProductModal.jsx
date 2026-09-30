// src/components/ProductModal.jsx
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default function ProductModal({ show, onHide, producto, onAdd }) {
  // Evitamos errores si el producto aún no ha cargado
  if (!producto) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="text-center mb-3 mb-md-0 d-flex align-items-center justify-content-center">
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="img-fluid rounded" 
              style={{ maxHeight: '300px', objectFit: 'contain' }} 
            />
          </Col>
          <Col md={6}>
            <h3 className="text-primary fw-bold mb-3">${producto.precio.toLocaleString('es-CL')}</h3>
            
            {/* Llama a la descripción dinámica del administrador */}
            <p className="text-secondary">{producto.descripcion || 'Sin descripción disponible.'}</p>
            
            <h5 className="fw-bold mt-4 border-bottom pb-2">Especificaciones principales:</h5>
            <ul className="text-muted">
              <li>Stock actual: <strong className="text-dark">{producto.stock} unidades disponibles</strong></li>
              <li>Categoría: <strong className="text-dark">{producto.categoria}</strong></li>
              
              {/* Renderiza dinámicamente la lista de especificaciones */}
              {producto.especificaciones && producto.especificaciones.map((esp, index) => (
                <li key={index}>{esp}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>Cerrar</Button>
        <Button variant="primary" onClick={() => { onAdd(producto); onHide(); }}>
          Añadir al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}