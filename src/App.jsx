import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation';
import CartToast from './components/CartToast';
import Home from './pages/Home';
import Computadoras from './pages/Computadoras';
import Accesorios from './pages/Accesorios';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Admin from './pages/Admin';
import Busqueda from './pages/Busqueda'; // NUEVO COMPONENTE

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carrito_thinktech');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showToast, setShowToast] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");

  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const saved = localStorage.getItem('sesion_thinktech');
    if (saved) {
      try { return JSON.parse(saved); } 
      catch (e) {
        localStorage.removeItem('sesion_thinktech');
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('carrito_thinktech', JSON.stringify(cart));
  }, [cart]);

  const agregarAlCarrito = (producto) => {
    setCart([...cart, producto]);
    setProductoAgregado(producto.nombre);
    setShowToast(true);
  };
  
  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...cart];
    nuevoCarrito.splice(index, 1);
    setCart(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCart([]);
  };

  const handleLogin = (datosUsuario) => {
    setUsuarioActivo(datosUsuario);
    localStorage.setItem('sesion_thinktech', JSON.stringify(datosUsuario));
  };

  const handleLogout = () => {
    setUsuarioActivo(null);
    localStorage.removeItem('sesion_thinktech');
  };

  return (
    <Router>
      <Navigation cantidadCarrito={cart.length} usuarioActivo={usuarioActivo} onLogout={handleLogout} />
      <CartToast show={showToast} onClose={() => setShowToast(false)} productoNombre={productoAgregado} />

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home onAddToCart={agregarAlCarrito} />} />
          <Route path="/pc" element={<Computadoras onAddToCart={agregarAlCarrito} />} />
          <Route path="/accesorios" element={<Accesorios onAddToCart={agregarAlCarrito} />} />
          <Route path="/busqueda" element={<Busqueda onAddToCart={agregarAlCarrito} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          
          <Route path="/carrito" element={<Carrito cart={cart} onRemove={eliminarDelCarrito} onClearCart={vaciarCarrito} />} />
          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin" element={usuarioActivo?.isAdmin ? <Admin /> : <Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="border-top py-4 text-center text-body-secondary small mt-5 bg-body-tertiary">
        © 2026 Think-Tech. Todos los derechos reservados.
      </footer>
    </Router>
  );
}

export default App;