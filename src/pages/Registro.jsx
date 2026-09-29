// src/pages/Registro.jsx
import { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Registro() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Nuevo estado de éxito
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const pass1 = e.target.pass1.value;
    const pass2 = e.target.pass2.value;

    if (pass1 !== pass2) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios_thinktech')) || [];
    
    if (usuarios.find(user => user.email === email)) {
      setError('Este correo electrónico ya está registrado.');
      return;
    }

    usuarios.push({ nombre, email, password: pass1 });
    localStorage.setItem('usuarios_thinktech', JSON.stringify(usuarios));
    
    // Mostramos el mensaje de éxito en lugar del alert nativo
    setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...');
    
    // Esperamos 2 segundos para que el usuario lea el mensaje y luego redirigimos
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <Row className="justify-content-center animate__animated animate__fadeIn">
      <Col xs={12} md={8} lg={5}>
        <Card className="border-0 shadow-sm p-4">
          <h2 className="text-center mb-4 fw-bold">Crea tu cuenta</h2>
          
          {/* Renderizado condicional de los mensajes */}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre o Nickname</Form.Label>
              <Form.Control type="text" name="nombre" required disabled={success !== ''} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" name="email" required disabled={success !== ''} />
            </Form.Group>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control type={showPass ? "text" : "password"} name="pass1" required disabled={success !== ''} />
                  <Button variant="outline-secondary" onClick={() => setShowPass(!showPass)}>👁️</Button>
                </InputGroup>
              </Col>
              <Col md={6} className="mb-4">
                <Form.Label>Repetir Contraseña</Form.Label>
                <InputGroup>
                  <Form.Control type={showPass ? "text" : "password"} name="pass2" required disabled={success !== ''} />
                  <Button variant="outline-secondary" onClick={() => setShowPass(!showPass)}>👁️</Button>
                </InputGroup>
              </Col>
            </Row>

            <Button variant="success" type="submit" className="w-100 fw-bold py-2" disabled={success !== ''}>
              REGISTRARME
            </Button>
          </Form>
          
          <div className="text-center mt-3 small">
            ¿Ya tienes cuenta? <Link to="/login" className="text-decoration-none fw-bold">Inicia sesión</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
}