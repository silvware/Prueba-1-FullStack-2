// src/pages/Carrito.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Carrito from './Carrito';

describe('Componente Carrito (Renderizado Condicional)', () => {
  
  it('Renderiza la interfaz de "carrito vacío" cuando no recibe productos', () => {
    // Renderizamos el componente pasándole un arreglo vacío
    render(
      <MemoryRouter>
        <Carrito cart={[]} onRemove={() => {}} />
      </MemoryRouter>
    );
    
    // Verificamos que aparezca el mensaje y el botón de redirección
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
    expect(screen.getByText(/Ir a comprar/i)).toBeInTheDocument();
  });

  it('Renderiza la lista de productos y calcula el total exacto cuando hay elementos', () => {
    // Creamos un estado falso (mock) con dos productos
    const mockCart = [
      { nombre: "Mouse Gamer", precio: 19990, imagen: "/mouse.webp" },
      { nombre: "Teclado Mecánico RGB", precio: 34990, imagen: "/tecla.webp" }
    ];

    render(
      <MemoryRouter>
        <Carrito cart={mockCart} onRemove={() => {}} />
      </MemoryRouter>
    );

    // Verificamos que los nombres de los productos estén en la pantalla
    expect(screen.getByText("Mouse Gamer")).toBeInTheDocument();
    expect(screen.getByText("Teclado Mecánico RGB")).toBeInTheDocument();

    // Verificamos que el mensaje de "carrito vacío" NO exista en el DOM
    expect(screen.queryByText(/tu carrito está vacío/i)).not.toBeInTheDocument();

    // Verificamos que el .reduce() haya sumado correctamente: 19990 + 34990 = 54980
    expect(screen.getByText('$54.980')).toBeInTheDocument();
  });
});