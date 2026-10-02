// src/pages/Carrito.jsx
import { useState } from 'react';
import { Container, Row, Col, Table, Button, Alert, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { inicializarBD } from '../data/db';

export default function Carrito({ cart, onRemove, onClearCart }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [numeroOrden, setNumeroOrden] = useState('');

  // Calcula el total a pagar
  const total = cart.reduce((acc, prod) => acc + prod.precio, 0);

  const procesarCompra = (e) => {
    e.preventDefault();
    
    // 1. Cargar la Base de Datos actual
    const bd = inicializarBD();
    let nuevaBd = [...bd];

    // 2. Descontar el stock por cada producto en el carrito
    cart.forEach(itemCarrito => {
      const index = nuevaBd.findIndex(p => p.id === itemCarrito.id);
      if (index !== -1 && nuevaBd[index].stock > 0) {
        nuevaBd[index].stock -= 1;
      }
    });

    // 3. Guardar el nuevo stock en la memoria
    localStorage.setItem("admin_productos", JSON.stringify(nuevaBd));

    // 4. Generar número de orden aleatorio
    const ordenGenerada = Math.floor(Math.random() * 90000) + 10000;
    setNumeroOrden(ordenGenerada);

    // 5. Cerrar formulario, vaciar carrito y mostrar éxito
    setShowCheckout(false);
    onClearCart();
    setShowSuccess(true);
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <Container className="text-center animate__animated animate__fadeIn py-5">
        <h3 className="mb-4 text-muted">Tu carrito está vacío 🛒</h3>
        <Link to="/pc">
          <Button variant="primary" size="lg" className="rounded-pill px-4">Ir a comprar</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="animate__animated animate__fadeIn">
      <h2 className="mb-4 fw-bold">Tu Carrito de Compras</h2>
      
      {/* ALERTA DE COMPRA EXITOSA */}
      {showSuccess ? (
        <Alert variant="success" className="text-center py-5 shadow-sm rounded">
          <h1 className="display-4">🎉</h1>
          <h2 className="fw-bold">¡Compra realizada con éxito!</h2>
          <p className="fs-5 mt-3">Tu número de orden es: <strong>#{numeroOrden}</strong></p>
          <p>Hemos enviado los detalles de envío a tu correo electrónico.</p>
          <Link to="/">
            <Button variant="success" className="mt-3 rounded-pill px-4">Volver al Inicio</Button>
          </Link>
        </Alert>
      ) : (
        <Row>
          <Col lg={8}>
            <Table responsive hover className="align-middle bg-white shadow-sm rounded">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((prod, index) => (
                  <tr key={index}>
                    <td><img src={prod.imagen} alt={prod.nombre} width="50" className="rounded"/></td>
                    <td className="fw-bold">{prod.nombre}</td>
                    <td className="text-primary fw-bold">${prod.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <Button variant="outline-danger" size="sm" onClick={() => onRemove(index)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          
          <Col lg={4}>
            <div className="bg-light p-4 rounded shadow-sm border">
              <h4 className="fw-bold mb-3 border-bottom pb-2">Resumen</h4>
              <div className="d-flex justify-content-between mb-3 fs-5">
                <span>Total a pagar:</span>
                <span className="text-primary fw-bold">${total.toLocaleString('es-CL')}</span>
              </div>
              <Button 
                variant="success" 
                size="lg" 
                className="w-100 fw-bold shadow-sm"
                onClick={() => setShowCheckout(true)}
              >
                Finalizar Compra
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {/* MODAL DE CHECKOUT (Formulario de envío) */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} backdrop="static" centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold">Detalles de Envío y Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={procesarCompra}>
            <h5 className="fw-bold text-primary mb-3">Total: ${total.toLocaleString('es-CL')}</h5>
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" placeholder="Ej: Juan Pérez" required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Dirección de Envío</Form.Label>
              <Form.Control type="text" placeholder="Av. Providencia 1234, Santiago" required />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Método de Pago</Form.Label>
              <Form.Select required>
                <option value="">Selecciona un método...</option>
                <option value="debito">Tarjeta de Débito (WebPay)</option>
                <option value="credito">Tarjeta de Crédito</option>
                <option value="transferencia">Transferencia Bancaria</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 fw-bold py-2">
              Confirmar y Pagar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}