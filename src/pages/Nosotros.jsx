// src/pages/Nosotros.jsx
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Nosotros() {
  return (
    <div className="animate__animated animate__fadeIn">
      <header className="bg-dark text-white text-center py-5 mb-5 rounded shadow-sm">
        <Container>
          <h1 className="display-4 fw-bold">Sobre Think-Tech</h1>
          <p className="lead">Pasión por el hardware, compromiso con tu rendimiento.</p>
        </Container>
      </header>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm p-4">
            <h3 className="fw-bold text-primary">Nuestra Misión</h3>
            <p>Proveer a nuestros clientes con la mejor tecnología del mercado, ofreciendo equipos de alto rendimiento y accesorios de calidad superior. Nos dedicamos a asesorar de manera transparente para que cada usuario encuentre la herramienta perfecta para sus necesidades.</p>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm p-4">
            <h3 className="fw-bold text-success">Nuestra Visión</h3>
            <p>Convertirnos en la tienda de tecnología referente a nivel nacional, destacando no solo por nuestro catálogo de vanguardia, sino por crear una comunidad informada y apasionada por el mundo del hardware y el gaming.</p>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <h2 className="fw-bold">Nuestro Equipo Fundador</h2>
        <p className="text-muted mb-4">Un proyecto nacido de la pasión tecnológica de estudiantes de Duoc UC.</p>
        
        <Row>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm pt-4 h-100">
              <img src="/resources/skips.jpg" className="rounded-circle mx-auto mb-3 shadow-sm" style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt="Benjamín Aguilera" />
              <Card.Body>
                <h5 className="fw-bold">Benjamín Aguilera</h5>
                <p className="text-muted">Desarrollador FullStack</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm pt-4 h-100">
              <img src="/resources/musculoso.jpg" className="rounded-circle mx-auto mb-3 shadow-sm" style={{ width: '150px', height: '150px', objectFit: 'cover', objectPosition: 'top' }} alt="José Silva" />
              <Card.Body>
                <h5 className="fw-bold">José Silva</h5>
                <p className="text-muted">Desarrollador FullStack</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm pt-4 h-100">
              <img src="/resources/pedro.jpg" className="rounded-circle mx-auto mb-3 shadow-sm" style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt="Pedro Aranedas" />
              <Card.Body>
                <h5 className="fw-bold">Pedro Aranedas</h5>
                <p className="text-muted">Desarrollador FullStack</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}