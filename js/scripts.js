let carrito = []; //arreglo o lista vacia
let carritoGuardado = localStorage.getItem('carritoTienda'); // Buscamos si hay algo guardado de antes

// Si encontramos algo guardado, lo convertimos de texto a un arreglo de verdad
if (carritoGuardado != null) {
    carrito = JSON.parse(carritoGuardado);
}

function agregarAlCarrito(nombreProducto, precioProducto, imagenProducto) {
    let productoYaExiste = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombreProducto) {
            carrito[i].cantidad = carrito[i].cantidad + 1; // Si existe, le sumamos 1
            productoYaExiste = true;
        }
    }

    // Si el ciclo terminó y el producto no existía, lo creamos desde cero
    if (productoYaExiste === false) {
        let nuevoProducto = {
            nombre: nombreProducto,
            precio: precioProducto,
            imagen: imagenProducto,
            cantidad: 1
        };
        carrito.push(nuevoProducto); 
    }

    //guardado de locale storage
    localStorage.setItem('carritoTienda', JSON.stringify(carrito));
    
    actualizarContador(); 
    alert("Agregaste: " + nombreProducto);
}

function actualizarContador() {
    let totalArticulos = 0;

    for (let i = 0; i < carrito.length; i++) {
        totalArticulos = totalArticulos + carrito[i].cantidad;
    }

    // Buscamos la etiqueta del HTML donde va el número y se lo cambiamos
    let textoContador = document.getElementById('contador-carrito');
    if (textoContador != null) {
        textoContador.innerHTML = totalArticulos;
    }
}

function renderizarCarrito() {
    let cajaLista = document.getElementById('lista-carrito');
    let textoTotal = document.getElementById('total-carrito');
    
    // Si la caja no existe, salimos
    if (cajaLista == null) {
        return; 
    }

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
        
        sumaTotalPlata = sumaTotalPlata + totalPorProducto; 
        
        cajaLista.innerHTML += `
            <article class="card mb-3 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-3 text-center p-2">
                        <img src="${item.imagen}" class="img-fluid rounded" width="80" alt="${item.nombre}">
                    </div>
                    <div class="col-6">
                        <h5>${item.nombre}</h5>
                        <p class="text-muted">Cantidad: ${item.cantidad}</p>
                    </div>
                    <div class="col-3 text-center">
                        <strong class="text-primary">$${totalPorProducto.toLocaleString('es-CL')}</strong> <br>
                        <button class="btn btn-sm btn-danger mt-2" onclick="eliminarDelCarrito(${i})">Borrar</button>
                    </div>
                </div>
            </article>
        `;
    }

    //formato con . correspondiente (para que se vea 1.000 y no 1000)
    textoTotal.innerHTML = "$" + sumaTotalPlata.toLocaleString('es-CL');
}

function eliminarDelCarrito(posicion) {
    carrito.splice(posicion, 1); 
    localStorage.setItem('carritoTienda', JSON.stringify(carrito)); // Guarda los cambios
    
    // Volvemos a dibujar todo actualizado
    renderizarCarrito();
    actualizarContador();
}

//mostrar/ocultar contraseña
function mostrarOcultarPass(idDelInput, boton) {
    let input = document.getElementById(idDelInput);
    
    // Si el input está oculto (password), lo cambiamos a texto visible
    if (input.type === "password") {
        input.type = "text";
        boton.innerText = "🙈"; 
    } else {
        // Si ya está visible, lo volvemos a ocultar
        input.type = "password";
        boton.innerText = "👁️"; 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Cargamos el carrito apenas la página esté lista
    actualizarContador();
    renderizarCarrito();
    // NOTA: Se borraron los rastreadores viejos de formulario que causaban error
});

//conexion con (detalles de procutos) al presionar ver detalles se lanzan estos 5 datoss
function verDetalle(nombre, precio, imagen, descripcion, especificaciones) {
    //relleno
    document.getElementById('modalTitulo').innerText = nombre;
    document.getElementById('modalPrecio').innerText = '$' + precio.toLocaleString('es-CL');
    document.getElementById('modalImagen').src = imagen;
    document.getElementById('modalDescripcion').innerText = descripcion;

    const listaEspecs = document.getElementById('modalEspecificaciones');
    listaEspecs.innerHTML = '';
    especificaciones.forEach(spec => {
        const li = document.createElement('li');
        li.innerText = spec;
        listaEspecs.appendChild(li);
    });

    document.getElementById('btnModalAgregar').onclick = function() {
        agregarAlCarrito(nombre, precio, imagen);
        bootstrap.Modal.getInstance(document.getElementById('modalDetalleProducto')).hide();
    };

    const modal = new bootstrap.Modal(document.getElementById('modalDetalleProducto'));
    modal.show();
}

// ==========================================
// LÓGICA DE USUARIOS (LOGIN Y REGISTRO)
// ==========================================

// Función para el formulario de REGISTRO
function registrarUsuario(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Se capturan datos del nuevo diseño
    const nombre = document.getElementById('nombreRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const pass1 = document.getElementById('pass1Registro').value;
    const pass2 = document.getElementById('pass2Registro').value;

    // 1. Validar contraseñas
    if (pass1 !== pass2) {
        alert("¡Error! Las contraseñas no coinciden. Por favor, revísalas.");
        return; 
    }

    // Trae user guardado o se crea lista nueva
    const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

    // Evitamos que el ingreso sea con el mismo correo(duplicado)
    const usuarioExiste = usuarios.find(user => user.email === email);
    if (usuarioExiste) {
        alert("¡Error! Este correo ya se encuentra registrado.");
        return; 
    }

    // Si no existe se agrega y se guarda
    usuarios.push({ nombre: nombre, email: email, password: pass1 });
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));

    alert("¡Registro exitoso " + nombre + "! Ahora puedes iniciar sesión.");
    window.location.href = 'login.html'; // Al registrase se redirige al login
}

// Función para el formulario de LOGIN
function iniciarSesion(event) {
    event.preventDefault(); 

    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passLogin').value;

    // Traemos la lista de usuarios registrados desde la memoria
    const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

    // Buscamos si hay algún usuario con ese correo
    const usuarioEncontrado = usuarios.find(user => user.email === email);

    // Si NO se encuentra el correo:
    if (!usuarioEncontrado) {
        alert("Usuario no registrado o no encontrado.");
        return; 
    }

    // Si el correo SÍ existe, pero la contraseña está mal:
    if (usuarioEncontrado.password !== password) {
        alert("Contraseña incorrecta. Inténtalo de nuevo.");
        return;
    }

    alert("¡Sesión iniciada con éxito! Bienvenido(a).");
    window.location.href = 'index.html'; // Lo enviamos a la página principal
}