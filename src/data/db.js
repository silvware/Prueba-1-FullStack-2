// src/data/db.js

const productosIniciales = [
    { id: 1, nombre: "Lenovo ThinkPad T14 Gen 4", categoria: "Computadoras", precio: 649990, stock: 15, imagen: "/resources/ThinkpadT14.jpg", descripcion: "El ThinkPad T14 Gen 4 está diseñado para profesionales exigentes.", especificaciones: ["Intel Core i5", "16 GB RAM", "512 GB SSD"] },
    { id: 2, nombre: "MacBook Air 13 M3", categoria: "Computadoras", precio: 999990, stock: 8, imagen: "/resources/macbookm3.jpg", descripcion: "El ultrabook más popular de Apple con chip M3.", especificaciones: ["Chip M3", "8 GB RAM", "256 GB SSD"] },
    { id: 3, nombre: "Dell XPS 13", categoria: "Computadoras", precio: 1099990, stock: 5, imagen: "/resources/dell.jpg", descripcion: "Diseño premium y ultraligero con pantalla InfinityEdge.", especificaciones: ["Intel Core i7", "16 GB RAM", "512 GB SSD"] },
    { id: 4, nombre: "ASUS ROG Strix G16", categoria: "Computadoras", precio: 1299990, stock: 3, imagen: "/resources/asus.png", descripcion: "Máxima potencia para gaming competitivo.", especificaciones: ["Intel Core i7", "RTX 4060", "16 GB RAM"] },
    { id: 5, nombre: "HP Pavilion 15", categoria: "Computadoras", precio: 449990, stock: 12, imagen: "/resources/hp.png", descripcion: "Un equipo versátil para clases virtuales y ofimática.", especificaciones: ["AMD Ryzen 5", "8 GB RAM", "512 GB SSD"] },
    { id: 6, nombre: "Acer Aspire 5", categoria: "Computadoras", precio: 379990, stock: 20, imagen: "/resources/acer.jpg", descripcion: "Excelente relación calidad-precio para tareas domésticas.", especificaciones: ["Intel Core i5", "8 GB RAM", "256 GB SSD"] },
    { id: 7, nombre: "Teclado Mecánico RGB", categoria: "Accesorios", precio: 34990, stock: 30, imagen: "/resources/tecla.webp", descripcion: "Teclado mecánico ideal para gaming.", especificaciones: ["Switches Red", "RGB Personalizable"] },
    { id: 8, nombre: "Mouse Gamer", categoria: "Accesorios", precio: 19990, stock: 25, imagen: "/resources/mous.webp", descripcion: "Mouse ergonómico de alta precisión.", especificaciones: ["16.000 DPI", "6 botones programables"] },
    { id: 9, nombre: "Audífonos Gamer 7.1", categoria: "Accesorios", precio: 27490, stock: 18, imagen: "/resources/audif.jpg", descripcion: "Diadema con audio surround.", especificaciones: ["Sonido 7.1", "Micrófono omnidireccional"] },
    { id: 10, nombre: "Monitor 27 IPS", categoria: "Accesorios", precio: 159990, stock: 10, imagen: "/resources/monitot.webp", descripcion: "Pantalla fluida con colores vívidos.", especificaciones: ["144Hz", "1ms respuesta"] },
    { id: 11, nombre: "HDMI", categoria: "Accesorios", precio: 19990, stock: 50, imagen: "/resources/hdmi.webp", descripcion: "Cable HDMI de alta velocidad.", especificaciones: ["Largo: 1.5m", "Full HD"] },
    { id: 12, nombre: "Memoria USB", categoria: "Accesorios", precio: 34500, stock: 45, imagen: "/resources/usb.webp", descripcion: "Alta velocidad de transferencia.", especificaciones: ["256GB", "USB 3.0"] },
    { id: 13, nombre: "Microfono Gamer", categoria: "Accesorios", precio: 49000, stock: 14, imagen: "/resources/micro.avif", descripcion: "Micrófono de alta calidad.", especificaciones: ["Conexión USB", "Cancelación de ruido"] }
];

export const inicializarBD = () => {
    const bdGuardada = localStorage.getItem("admin_productos");
    // Si existe y tiene elementos, la retorna
    if (bdGuardada && JSON.parse(bdGuardada).length > 0) {
        return JSON.parse(bdGuardada);
    } 
    // Si está vacía, guarda el arreglo inicial y lo retorna
    else {
        localStorage.setItem("admin_productos", JSON.stringify(productosIniciales));
        return productosIniciales;
    }
};