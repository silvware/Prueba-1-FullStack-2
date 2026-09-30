// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { inicializarBD } from '../data/db';

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  // Ampliamos el estado para incluir descripción y especificaciones
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Computadoras',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: '',
    especificaciones: ''
  });

  useEffect(() => {
    const bd = inicializarBD();
    setProductos(bd);
  }, []);

  const actualizarBD = (nuevosProductos) => {
    setProductos(nuevosProductos);
    localStorage.setItem("admin_productos", JSON.stringify(nuevosProductos));
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const filtrados = productos.filter(p => p.id !== id);
      actualizarBD(filtrados);
    }
  };

  const handleAbrirModal = (prod = null) => {
    if (prod) {
      setEditandoId(prod.id);
      setFormData({
        ...prod,
        // Si el producto tiene especificaciones en array, las unimos con comas para el input de texto
        especificaciones: prod.especificaciones ? prod.especificaciones.join(', ') : ''
      });
    } else {
      setEditandoId(null);
      setFormData({ nombre: '', categoria: 'Computadoras', precio: '', stock: '', imagen: '', descripcion: '', especificaciones: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // LÓGICA DE ID SECUENCIAL: Busca el ID más alto y le suma 1. Si no hay productos, empieza en 1.
    const nuevoIdSecuencial = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    // Convertimos el texto separado por comas en un arreglo (array) real para la base de datos
    const arrayEspecificaciones = formData.especificaciones
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const nuevoProducto = {
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      especificaciones: arrayEspecificaciones,
      id: editandoId ? editandoId : nuevoIdSecuencial 
    };

    if (editandoId) {
      const actualizados = productos.map(p => p.id === editandoId ? nuevoProducto : p);
      actualizarBD(actualizados);
    } else {
      actualizarBD([...productos, nuevoProducto]);
    }
    
    setShowModal(false);
  };

  return (
    <Container className="animate__animated animate__fadeIn">
      <Row className="mb-4 align-items-center">
        <Col><h2>Inventario de Productos</h2></Col>
        <Col className="text-end">
          <Button variant="success" className="fw-bold" onClick={() => handleAbrirModal()}>+ Nuevo Producto</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="bg-white shadow-sm align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td><img src={prod.imagen} alt={prod.nombre} width="40" className="rounded"/></td>
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>${prod.precio.toLocaleString('es-CL')}</td>
              <td>
                <span className={`badge ${prod.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                  {prod.stock} unids.
                </span>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2 fw-bold" onClick={() => handleAbrirModal(prod)}>Editar</Button>
                <Button variant="danger" size="sm" className="fw-bold" onClick={() => handleEliminar(prod.id)}>Borrar</Button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr><td colSpan="7" className="text-center">No hay productos en el inventario.</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{editandoId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del producto</Form.Label>
                  <Form.Control type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                    <option value="Computadoras">Computadoras</option>
                    <option value="Accesorios">Accesorios</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio ($)</Form.Label>
                  <Form.Control type="number" min="0" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Ruta de la Imagen</Form.Label>
              <Form.Control type="text" placeholder="/resources/ejemplo.png" value={formData.imagen} onChange={e => setFormData({...formData, imagen: e.target.value})} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción del producto</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} placeholder="Ej: Excelente equipo recomendado para tareas..." required />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Especificaciones (separadas por coma)</Form.Label>
              <Form.Control type="text" value={formData.especificaciones} onChange={e => setFormData({...formData, especificaciones: e.target.value})} placeholder="Ej: 16 GB RAM, 512 GB SSD, Intel Core i5" required />
              <Form.Text className="text-muted">Escribe cada característica separada por una coma.</Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 fw-bold">Guardar Cambios</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}