// src/components/ProductCard.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

const mockProducto = {
  id: 1,
  nombre: "Laptop Test de Alto Rendimiento",
  precio: 500000,
  stock: 5,
  imagen: "/test.jpg",
  categoria: "pc"
};

describe('Componente ProductCard', () => {
  
  it('Renderiza correctamente el producto utilizando las propiedades (props) recibidas', () => {
    // Renderizamos el componente envolviéndolo en MemoryRouter porque usa componentes Link
    render(
      <MemoryRouter>
        <ProductCard producto={mockProducto} onAdd={() => {}} onViewDetails={() => {}} />
      </MemoryRouter>
    );
    
    // Verificamos que los datos del mock se pinten en el DOM
    expect(screen.getByText('Laptop Test de Alto Rendimiento')).toBeInTheDocument();
    expect(screen.getByText(/Stock disponible: 5/i)).toBeInTheDocument();
    expect(screen.getByText('$500.000')).toBeInTheDocument();
  });

  it('Simula el evento click de usuario para añadir al carrito', async () => {
    // Creamos funciones "espía" (mocks) para escuchar los eventos
    const mockOnAdd = vi.fn();
    const mockOnViewDetails = vi.fn();
    const user = userEvent.setup();
    
    render(
      <MemoryRouter>
        <ProductCard producto={mockProducto} onAdd={mockOnAdd} onViewDetails={mockOnViewDetails} />
      </MemoryRouter>
    );
    
    // Buscamos el botón específico y simulamos un clic real
    const btnAñadir = screen.getByRole('button', { name: /añadir al carrito/i });
    await user.click(btnAñadir);
    
    // Verificamos que la función de estado se llamó exactamente 1 vez con el producto correcto
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith(mockProducto);
  });
});