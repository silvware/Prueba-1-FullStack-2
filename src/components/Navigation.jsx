// src/components/Navigation.jsx
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navigation({ cantidadCarrito, usuarioActivo, onLogout }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    onLogout();
    navigate('/'); // Redirige al home al cerrar sesión
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
            
            {/* RENDERIZADO CONDICIONAL DE SESIÓN */}
            {usuarioActivo ? (
              <div className="d-flex align-items-center me-3">
                {/* Convertimos el saludo en un enlace directo al panel */}
                <Link to="/admin" className="fw-bold text-primary me-3 text-decoration-none" title="Ir al Panel de Administración">
                  👋 Bienvenido, {usuarioActivo}
                </Link>
                <Button variant="outline-danger" size="sm" onClick={cerrarSesion}>
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-primary fw-bold">👤 Ingresar</Nav.Link>
                <Nav.Link as={Link} to="/registro" className="text-success fw-bold me-2">📝 Registro</Nav.Link>
              </>
            )}

            <Nav.Link as={Link} to="/carrito" className="text-dark">
              🛒 Carrito <Badge bg="secondary">{cantidadCarrito}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}