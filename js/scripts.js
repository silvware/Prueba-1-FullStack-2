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

    // Guardamos el arreglo en LocalStorage (exigencia de la rúbrica)
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

// 4. FUNCIÓN PARA DIBUJAR LOS PRODUCTOS EN LA PÁGINA "CARRITO.HTML"
function renderizarCarrito() {
    let cajaLista = document.getElementById('lista-carrito');
    let textoTotal = document.getElementById('total-carrito');
    
    if (cajaLista == null) {
        return; 
    }

    cajaLista.innerHTML = ''; // Limpieza de caja
    let sumaTotalPlata = 0;

    if (carrito.length === 0) {
        cajaLista.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
        textoTotal.innerHTML = '$0';
        return; 
    }

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let totalPorProducto = item.precio * item.cantidad;
        
        sumaTotalPlata = sumaTotalPlata + totalPorProducto; // Vamos sumando la plata
        
        // Aqui se meten cosas de pc.html a carrito.html
        cajaLista.innerHTML += `
            <article class="card mb-3 shadow-sm">
                <div class="row g-0 align-items-center">
                    <div class="col-3 text-center p-2">
                        <img src="${item.imagen}" width="80" alt="${item.nombre}">
                    </div>
                    <div class="col-6">
                        <h5>${item.nombre}</h5>
                        <p class="text-muted">Cantidad: ${item.cantidad}</p>
                    </div>
                    <div class="col-3 text-center">
                        <strong class="text-primary">$${totalPorProducto}</strong> <br>
                        <button class="btn btn-sm btn-danger mt-2" onclick="eliminarDelCarrito(${i})">Borrar</button>
                    </div>
                </div>
            </article>
        `;
    }

    // Actualizar texto por la suma total
    textoTotal.innerHTML = "$" + sumaTotalPlata;
}

function eliminarDelCarrito(posicion) {
    carrito.splice(posicion, 1); // Borra 1 elemento en la posición indicada
    localStorage.setItem('carritoTienda', JSON.stringify(carrito)); // Guarda los cambios
    
    // Volvemos a dibujar todo actualizado
    renderizarCarrito();
    actualizarContador();
}

// ESTAS DOS LÍNEAS SE EJECUTAN SOLAS APENAS CARGA LA PÁGINA
actualizarContador();
renderizarCarrito();