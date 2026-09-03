//Catalogo
let productosIniciales = [
    { id: 1, nombre: "Lenovo ThinkPad T14 Gen 4", categoria: "Computadoras", precio: 649990, stock: 15, imagen: "../../resources/ThinkpadT14.jpg", descripcion: "El ThinkPad T14 Gen 4 está diseñado para profesionales exigentes.", especificaciones: ["Intel Core i5", "16 GB RAM", "512 GB SSD"] },
    { id: 2, nombre: "MacBook Air 13 M3", categoria: "Computadoras", precio: 999990, stock: 8, imagen: "../../resources/macbookm3.jpg", descripcion: "El ultrabook más popular de Apple con chip M3.", especificaciones: ["Chip M3", "8 GB RAM", "256 GB SSD"] },
    { id: 3, nombre: "Dell XPS 13", categoria: "Computadoras", precio: 1099990, stock: 5, imagen: "../../resources/dell.jpg", descripcion: "Diseño premium y ultraligero con pantalla InfinityEdge.", especificaciones: ["Intel Core i7", "16 GB RAM", "512 GB SSD"] },
    { id: 4, nombre: "ASUS ROG Strix G16", categoria: "Computadoras", precio: 1299990, stock: 3, imagen: "../../resources/asus.png", descripcion: "Máxima potencia para gaming competitivo.", especificaciones: ["Intel Core i7", "RTX 4060", "16 GB RAM"] },
    { id: 5, nombre: "HP Pavilion 15", categoria: "Computadoras", precio: 449990, stock: 12, imagen: "../../resources/hp.png", descripcion: "Un equipo versátil para clases virtuales y ofimática.", especificaciones: ["AMD Ryzen 5", "8 GB RAM", "512 GB SSD"] },
    { id: 6, nombre: "Acer Aspire 5", categoria: "Computadoras", precio: 379990, stock: 20, imagen: "../../resources/acer.jpg", descripcion: "Excelente relación calidad-precio para tareas domésticas.", especificaciones: ["Intel Core i5", "8 GB RAM", "256 GB SSD"] },
    { id: 7, nombre: "Teclado Mecánico RGB", categoria: "Accesorios", precio: 34990, stock: 30, imagen: "../../resources/tecla.webp", descripcion: "Teclado mecánico ideal para gaming.", especificaciones: ["Switches Red", "RGB Personalizable"] },
    { id: 8, nombre: "Mouse Gamer", categoria: "Accesorios", precio: 19990, stock: 25, imagen: "../../resources/mous.webp", descripcion: "Mouse ergonómico de alta precisión.", especificaciones: ["16.000 DPI", "6 botones programables"] },
    { id: 9, nombre: "Audífonos Gamer 7.1", categoria: "Accesorios", precio: 27490, stock: 18, imagen: "../../resources/audif.jpg", descripcion: "Diadema con audio surround.", especificaciones: ["Sonido 7.1", "Micrófono omnidireccional"] },
    { id: 10, nombre: "Monitor 27 IPS", categoria: "Accesorios", precio: 159990, stock: 10, imagen: "../../resources/monitot.webp", descripcion: "Pantalla fluida con colores vívidos.", especificaciones: ["144Hz", "1ms respuesta"] },
    { id: 11, nombre: "HDMI", categoria: "Accesorios", precio: 19990, stock: 50, imagen: "../../resources/hdmi.webp", descripcion: "Cable HDMI de alta velocidad.", especificaciones: ["Largo: 1.5m", "Full HD"] },
    { id: 12, nombre: "Memoria USB", categoria: "Accesorios", precio: 34500, stock: 45, imagen: "../../resources/usb.webp", descripcion: "Alta velocidad de transferencia.", especificaciones: ["256GB", "USB 3.0"] },
    { id: 13, nombre: "Microfono Gamer", categoria: "Accesorios", precio: 49000, stock: 14, imagen: "../../resources/micro.avif", descripcion: "Micrófono de alta calidad.", especificaciones: ["Conexión USB", "Cancelación de ruido"] }
];

function obtenerProductos() {
    let guardados = localStorage.getItem("admin_productos");
    if (guardados != null) {
        return JSON.parse(guardados); 
    } else {
        localStorage.setItem("admin_productos", JSON.stringify(productosIniciales));
        return productosIniciales;
    }
}

//Actualizar precio de vitrina
function actualizarPreciosVitrina() {
    let productos = obtenerProductos();
    
    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];
        
        // Busca si el HTML tiene la etiqueta con el ID de este producto
        let cajaPrecio = document.getElementById("precio-prod-" + prod.id);
        let cajaStock = document.getElementById("stock-prod-" + prod.id);
        
        // Si la encuentra, le chantamos el dato actualizado de la memoria
        if (cajaPrecio != null && cajaStock != null) {
            cajaPrecio.innerText = prod.precio.toLocaleString('es-CL');
            cajaStock.innerText = prod.stock;
        }
    }
}

//Carrito
let carrito = JSON.parse(localStorage.getItem('carritoTienda')) || [];

function agregarAlCarrito(idProducto) {
    let productos = obtenerProductos();
    
    // Buscamos los datos completos del producto usando su ID
    let productoEncontrado = productos.find(p => p.id === idProducto);

    //Si el stock es 0 no puede agregarse
    if (productoEncontrado.stock <= 0) {
        alert("¡Lo sentimos! " + productoEncontrado.nombre + " se encuentra sin stock por el momento.");
        return; // Cortamos la función para que no lo agregue
    }

    let productoYaExiste = false;

    // Revisamos si ya lo teníamos en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            carrito[i].cantidad += 1; 
            productoYaExiste = true;
        }
    }

    // Si es nuevo, lo guardamos con todos sus datos
    if (productoYaExiste === false) {
        carrito.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            imagen: productoEncontrado.imagen,
            cantidad: 1
        }); 
    }

    localStorage.setItem('carritoTienda', JSON.stringify(carrito));
    actualizarContador(); 
    alert("Agregaste: " + productoEncontrado.nombre);
}

function actualizarContador() {
    let totalArticulos = 0;
    for (let i = 0; i < carrito.length; i++) {
        totalArticulos += carrito[i].cantidad;
    }
    let textoContador = document.getElementById('contador-carrito');
    if (textoContador != null) textoContador.innerHTML = totalArticulos;
}

function renderizarCarrito() {
    let cajaLista = document.getElementById('lista-carrito');
    let textoTotal = document.getElementById('total-carrito');
    if (cajaLista == null) return; 

    cajaLista.innerHTML = ''; 
    let sumaTotalPlata = 0;

    if (carrito.length === 0) {
        cajaLista.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        textoTotal.innerHTML = '$0';
        return; 
    }

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let totalPorProducto = item.precio * item.cantidad;
        sumaTotalPlata += totalPorProducto; 
        
        cajaLista.innerHTML += `
            <article class="card mb-3 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-3 text-center p-2"><img src="${item.imagen}" class="img-fluid rounded" width="80"></div>
                    <div class="col-6"><h5>${item.nombre}</h5><p class="text-muted">Cantidad: ${item.cantidad}</p></div>
                    <div class="col-3 text-center">
                        <strong class="text-primary">$${totalPorProducto.toLocaleString('es-CL')}</strong><br>
                        <button class="btn btn-sm btn-danger mt-2" onclick="eliminarDelCarrito(${i})">Borrar</button>
                    </div>
                </div>
            </article>`;
    }
    textoTotal.innerHTML = "$" + sumaTotalPlata.toLocaleString('es-CL');
}

function eliminarDelCarrito(posicion) {
    carrito.splice(posicion, 1); 
    localStorage.setItem('carritoTienda', JSON.stringify(carrito)); 
    renderizarCarrito();
    actualizarContador();
}

// Cargar los datos en la ventana emergente automáticamente
function verDetalle(idProducto) {
    let productos = obtenerProductos();
    let prod = productos.find(p => p.id === idProducto);

    document.getElementById('modalTitulo').innerText = prod.nombre;
    document.getElementById('modalPrecio').innerText = '$' + prod.precio.toLocaleString('es-CL');
    document.getElementById('modalImagen').src = prod.imagen;
    document.getElementById('modalDescripcion').innerText = prod.descripcion;

    const listaEspecs = document.getElementById('modalEspecificaciones');
    listaEspecs.innerHTML = '';
    prod.especificaciones.forEach(spec => {
        const li = document.createElement('li');
        li.innerText = spec;
        listaEspecs.appendChild(li);
    });

    document.getElementById('btnModalAgregar').onclick = function() {
        agregarAlCarrito(prod.id);
        bootstrap.Modal.getInstance(document.getElementById('modalDetalleProducto')).hide();
    };

    const modal = new bootstrap.Modal(document.getElementById('modalDetalleProducto'));
    modal.show();
}

function mostrarOcultarPass(idDelInput, boton) {
    let input = document.getElementById(idDelInput);
    if (input.type === "password") { input.type = "text"; boton.innerText = "🙈"; } 
    else { input.type = "password"; boton.innerText = "👁️"; }
}

//Login de usuarios
function registrarUsuario(event) {
    event.preventDefault(); 
    const nombre = document.getElementById('nombreRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const pass1 = document.getElementById('pass1Registro').value;
    const pass2 = document.getElementById('pass2Registro').value;

    if (pass1 !== pass2) { alert("¡Error! Las contraseñas no coinciden."); return; }

    const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    if (usuarios.find(user => user.email === email)) { alert("¡Error! Correo ya registrado."); return; }

    usuarios.push({ nombre: nombre, email: email, password: pass1 });
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    window.location.href = 'login.html'; 
}

//Inicio de sesion para admin datos cargados por default
function iniciarSesion(event) {
    event.preventDefault(); 
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passLogin').value;

    if (email === "admin@thinktech.cl" && password === "admin123") {
        alert("¡Bienvenido al sistema, Administrador!");
        window.location.href = 'vista_admin.html'; 
        return; 
    }

    const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
    const usuarioEncontrado = usuarios.find(user => user.email === email);

    if (!usuarioEncontrado) { alert("Usuario no registrado o no encontrado."); return; }
    if (usuarioEncontrado.password !== password) { alert("Contraseña incorrecta."); return; }

    alert("¡Sesión iniciada con éxito!");
    window.location.href = 'index.html'; 
}

//Panel de admin (solo edicion)
function renderizarTabla() {
    let tbody = document.getElementById("tabla-productos-body");
    if (tbody == null) return; 

    let productos = obtenerProductos();
    tbody.innerHTML = ""; 

    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];
        tbody.innerHTML += `
            <tr>
                <td><strong>${prod.nombre}</strong></td>
                <td>${prod.categoria}</td>
                <td>${prod.stock} unids.</td>
                <td>$${prod.precio.toLocaleString('es-CL')}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm text-dark fw-bold" onclick="editarProducto(${prod.id})">Editar</button>
                </td>
            </tr>`;
    }
}

function editarProducto(idBuscado) {
    let productos = obtenerProductos();
    
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id === idBuscado) {
            let nuevoPrecio = prompt("NUEVO PRECIO para: " + productos[i].nombre, productos[i].precio);
            let nuevoStock = prompt("NUEVO STOCK para: " + productos[i].nombre, productos[i].stock);

            if (nuevoPrecio != null && nuevoStock != null) {
                productos[i].precio = Number(nuevoPrecio);
                productos[i].stock = Number(nuevoStock);
                
                localStorage.setItem("admin_productos", JSON.stringify(productos));
                renderizarTabla();
                alert("¡Actualizado exitosamente!");
            }
            break; 
        }
    }
}

//Inicializador de pagina
document.addEventListener("DOMContentLoaded", function() {
    actualizarContador();
    renderizarCarrito();
    renderizarTabla(); 
    actualizarPreciosVitrina(); // Actualiza el HTML estático con los datos de memoria
});