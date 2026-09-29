// src/pages/Contacto.jsx
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Contacto() {
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mostramos la alerta integrada
    setSuccess("¡Mensaje enviado correctamente! Nos pondremos en contacto contigo a la brevedad.");
    e.target.reset(); // Limpia el formulario
    
    // Oculta el mensaje después de 4 segundos
    setTimeout(() => {
      setSuccess('');
    }, 4000);
  };

  return (
    <Row className="justify-content-center animate__animated animate__fadeIn">
      <Col xs={12} lg={9}>
        <Card className="border-0 shadow-sm overflow-hidden">
          <Row className="g-0">
            <Col md={5} className="bg-dark text-white p-5 d-flex flex-column justify-content-center">
              <h3 className="fw-bold mb-4">¿Necesitas ayuda?</h3>
              <p className="mb-4">Si tienes dudas sobre el stock, quieres armar un equipo a medida o necesitas soporte técnico, escríbenos.</p>
              <p className="mb-2">📍 Santiago, Chile</p>
              <p className="mb-2">✉️ soporte@thinktech.cl</p>
              <p className="mb-0">📞 +56 9 1234 5678</p>
            </Col>
            
            <Col md={7} className="p-5">
              <h4 className="mb-4 fw-bold">Envíanos un mensaje</h4>
              
              {/* Alerta de éxito integrada */}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Motivo de consulta</Form.Label>
                  <Form.Select required>
                    <option value="">Selecciona una opción...</option>
                    <option value="Soporte">Soporte Técnico</option>
                    <option value="Ventas">Consulta de Ventas</option>
                    <option value="Garantia">Garantías y Devoluciones</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control as="textarea" rows={4} required />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100 fw-bold">
                  ENVIAR MENSAJE
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}