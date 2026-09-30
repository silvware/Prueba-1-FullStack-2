// src/pages/Login.jsx
import { useState } from 'react';
import { Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios_thinktech')) || [];
    const usuarioValido = usuarios.find(user => user.email === email && user.password === password);

    if (usuarioValido) {
      // Validamos dinámicamente si el correo cumple con el formato de administrador
      const esAdministrador = usuarioValido.email.endsWith('@admin.com');

      // Pasamos un objeto con los datos y el rol (true o false)
      onLogin({ 
        nombre: usuarioValido.nombre, 
        email: usuarioValido.email, 
        isAdmin: esAdministrador 
      }); 

      // Redirigimos según el rol
      if (esAdministrador) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Correo o contraseña incorrectos. Verifica que estés registrado.');
    }
  };

  return (
    <Row className="justify-content-center animate__animated animate__fadeIn">
      <Col xs={12} md={6} lg={4}>
        <Card className="border-0 shadow-sm p-4">
          <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" name="email" placeholder="ejemplo@correo.com" required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" placeholder="********" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 fw-bold py-2">ENTRAR</Button>
          </Form>
          <div className="text-center mt-3 small">
            ¿No tienes cuenta? <Link to="/registro" className="text-decoration-none fw-bold">Regístrate aquí</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
}