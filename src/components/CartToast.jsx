import { Toast, ToastContainer } from 'react-bootstrap';

export default function CartToast({ show, onClose, productoNombre }) {
  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed', zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide bg="success">
        <Toast.Header>
          <strong className="me-auto">🛒 Carrito actualizado</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          Se añadió <b>{productoNombre}</b> a tu carrito.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}