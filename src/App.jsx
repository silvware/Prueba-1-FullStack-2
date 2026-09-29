// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carrito_thinktech');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showToast, setShowToast] = useState(false);
  const [productoAgregado, setProductoAgregado] = useState("");

  // NUEVO: Estado para el usuario conectado
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    return localStorage.getItem('sesion_thinktech') || null;
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

  // NUEVAS FUNCIONES: Manejo de sesión
  const handleLogin = (nombreUsuario) => {
    setUsuarioActivo(nombreUsuario);
    localStorage.setItem('sesion_thinktech', nombreUsuario);
  };

  const handleLogout = () => {
    setUsuarioActivo(null);
    localStorage.removeItem('sesion_thinktech');
  };

  return (
    <Router>
      {/* Pasamos el usuario activo y la función de cierre al Navbar */}
      <Navigation cantidadCarrito={cart.length} usuarioActivo={usuarioActivo} onLogout={handleLogout} />

      <CartToast show={showToast} onClose={() => setShowToast(false)} productoNombre={productoAgregado} />

      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home onAddToCart={agregarAlCarrito} />} />
          <Route path="/pc" element={<Computadoras onAddToCart={agregarAlCarrito} />} />
          <Route path="/accesorios" element={<Accesorios onAddToCart={agregarAlCarrito} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito cart={cart} onRemove={eliminarDelCarrito} />} />
          
          {/* Pasamos la función de login al componente Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <footer className="border-top py-4 text-center text-muted small mt-5 bg-white">
        © 2026 Think-Tech. Todos los derechos reservados.
      </footer>
    </Router>
  );
}

export default App;