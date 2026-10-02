// src/components/Navigation.jsx
import { useState } from 'react';
import { Navbar, Nav, Container, Badge, Button, Form } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navigation({ cantidadCarrito, usuarioActivo, onLogout }) {
  const navigate = useNavigate();
  const [termino, setTermino] = useState('');

  const cerrarSesion = () => {
    onLogout();
    navigate('/'); 
  };

  // Función para procesar la búsqueda
  const handleBuscar = (e) => {
    e.preventDefault();
    if (termino.trim() !== '') {
      navigate(`/busqueda?q=${termino}`);
      setTermino(''); // Limpia el buscador después de buscar
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/resources/logopagina.png" alt="Think-Tech" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/pc">Computadoras</Nav.Link>
            <Nav.Link as={NavLink} to="/accesorios">Accesorios</Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            {/* FORMULARIO DE BÚSQUEDA */}
            <Form className="d-flex me-3 my-2 my-lg-0" onSubmit={handleBuscar}>
              <Form.Control 
                type="search" 
                placeholder="Buscar producto..." 
                className="me-2 rounded-pill form-control-sm" 
                value={termino} 
                onChange={(e) => setTermino(e.target.value)} 
              />
              <Button variant="outline-primary" size="sm" type="submit" className="rounded-pill px-3">🔍</Button>
            </Form>

            {usuarioActivo ? (
              <div className="d-flex align-items-center me-3">
                {usuarioActivo.isAdmin ? (
                  <Link to="/admin" className="fw-bold text-danger me-3 text-decoration-none" title="Ir al Panel">
                    ⚙️ Panel Admin ({usuarioActivo.nombre})
                  </Link>
                ) : (
                  <span className="fw-bold text-primary me-3">
                    👋 Hola, {usuarioActivo.nombre}
                  </span>
                )}
                <Button variant="outline-danger" size="sm" onClick={cerrarSesion}>Cerrar sesión</Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-primary fw-bold">👤 Ingresar</Nav.Link>
                <Nav.Link as={Link} to="/registro" className="text-success fw-bold me-2">📝 Registro</Nav.Link>
              </>
            )}

            <Nav.Link as={Link} to="/carrito" className="text-dark fw-bold">
              🛒 Carrito <Badge bg="primary" className="rounded-pill">{cantidadCarrito}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}