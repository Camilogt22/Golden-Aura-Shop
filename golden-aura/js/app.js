// ======================================================
// 1. DATOS DE LOS PRODUCTOS
// ======================================================

const liquidBrun = {
  id: 1,
  nombre: "Liquid Brun",
  precio: 400000,
  categoria: "masculino",
  aroma: "amaderado",
  stock: 2,
  destacado: true,
  imagen: "assets/images/liquid-brun.jpg",
  descripcion: "Fragancia amaderada que combina calidez y sensualidad."
};

const yumYum = {
  id: 2,
  nombre: "Yum Yum Armaf",
  precio: 250000,
  categoria: "femenino",
  aroma: "dulce",
  stock: 7,
  destacado: true,
  imagen: "assets/images/yum-yum.jpg",
  descripcion:
    "Fragancia dulce y vibrante con frescura frutal, notas florales y una base cálida."
};

const lattafaAsad = {
  id: 3,
  nombre: "Lattafa Asad",
  precio: 260000,
  categoria: "masculino",
  aroma: "dulce",
  stock: 10,
  destacado: true,
  imagen: "assets/images/lattafa-asad.jpg",
  descripcion:
    "Fragancia intensa y envolvente con un carácter dulce y sofisticado."
};

const lattafaKhamrah = {
  id: 4,
  nombre: "Lattafa Khamrah",
  precio: 155000,
  categoria: "unisex",
  aroma: "dulce",
  stock: 8,
  destacado: false,
  imagen: "assets/images/lattafa-khamrah.jpg",
  descripcion: "Fragancia unisex cálida, dulce y sofisticada."
};

const clubDeNuitUntold = {
  id: 5,
  nombre: "Club de Nuit Untold",
  precio: 250000,
  categoria: "femenino",
  aroma: "floral",
  stock: 15,
  destacado: false,
  imagen: "assets/images/club-de-nuit-untold.jpg",
  descripcion: "Fragancia floral elegante con un carácter sofisticado y atrevido."
};

const amberOud = {
  id: 6,
  nombre: "Al Haramain Amber Oud",
  precio: 180000,
  categoria: "unisex",
  aroma: "citrico",
  stock: 5,
  destacado: false,
  imagen: "assets/images/amber-oud.jpg",
  descripcion: "Fragancia fresca y elegante con notas cítricas y amaderadas."
};

const odysseyMandarinSky = {
  id: 7,
  nombre: "Armaf Odyssey Mandarin Sky",
  precio: 320000,
  categoria: "masculino",
  aroma: "citrico",
  stock: 0,
  destacado: false,
  imagen: "assets/images/odyssey-mandarin-sky.jpg",
  descripcion: "Fragancia juvenil y versátil con un carácter cítrico y dulce."
};

const arabiansTonka = {
  id: 8,
  nombre: "Montale Arabians Tonka",
  precio: 500000,
  categoria: "unisex",
  aroma: "especiado",
  stock: 15,
  destacado: false,
  imagen: "assets/images/arabians-tonka.jpg",
  descripcion: "Fragancia intensa y exótica con notas especiadas y cálidas."
};


// ======================================================
// 2. ARRAY DE PRODUCTOS
// ======================================================

const productos = [
  liquidBrun,
  yumYum,
  lattafaAsad,
  lattafaKhamrah,
  clubDeNuitUntold,
  amberOud,
  odysseyMandarinSky,
  arabiansTonka
];


// ======================================================
// 3. CARRITO
// Recuperamos lo guardado en localStorage.
// Si no existe nada, usamos un array vacío.
// ======================================================

const carrito =
  JSON.parse(localStorage.getItem("carrito")) || [];


// ======================================================
// 4. ELEMENTOS DEL HTML
// ======================================================

const productosContainer =
  document.getElementById("productos-container");

const cartCount =
  document.getElementById("cart-count");

const carritoContenido =
  document.getElementById("carrito-contenido");

const catalogoContainer =
  document.getElementById("catalogo-container");

const buscador =
  document.getElementById("buscador");

const filtroCategoria =
  document.getElementById("filtro-categoria");

const filtroAroma =
  document.getElementById("filtro-aroma");

const filtroStock =
  document.getElementById("filtro-stock");

const rutaBase =
  window.location.pathname.includes("/pages/")
    ? "../"
    : "./";

const checkoutResumen =
  document.getElementById("checkout-resumen");

const checkoutTotal =
  document.getElementById("checkout-total");

const checkoutForm =
  document.getElementById("checkout-form");

const checkoutMensaje =
  document.getElementById("checkout-mensaje");

const btnFinalizarCompra =
  document.getElementById("btn-finalizar-compra");

const apiProductosContainer =
  document.getElementById("api-productos-container");

const apiEstado =
  document.getElementById("api-estado");

// ======================================================
// 5. GUARDAR CARRITO EN LOCALSTORAGE
// ======================================================

function guardarCarrito() {
  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );
}


// ======================================================
// 6. RENDERIZAR PRODUCTOS DESTACADOS
// ======================================================

function renderizarDestacados() {

  if (!productosContainer) {
    return;
  }

  productosContainer.innerHTML = "";

  productos.forEach((producto) => {

    if (producto.destacado === true) {

      let estadoStock = "";
      let claseStock = "";
      let botonDeshabilitado = "";

      if (producto.stock === 0) {

        estadoStock = "Agotado";
        claseStock = "text-bg-danger";
        botonDeshabilitado = "disabled";

      } else if (producto.stock <= 5) {

        estadoStock = "Últimas unidades";
        claseStock = "text-bg-warning";

      } else {

        estadoStock = "Disponible";
        claseStock = "text-bg-success";

      }


      productosContainer.innerHTML += `
        <div class="col-12 col-md-4">

          <article class="card product-card h-100">

            <img
              src="${rutaBase}${producto.imagen}"
              class="card-img-top product-image"
              alt="Perfume ${producto.nombre}"
            >

            <div class="card-body">

              <span class="badge ${claseStock}">
                ${estadoStock}
              </span>

              <h3 class="card-title mt-3">
                ${producto.nombre}
              </h3>

              <p class="card-text">
                ${producto.descripcion}
              </p>

              <p class="product-price">
                $${producto.precio.toLocaleString("es-CO")}
              </p>

              <p>
                Stock: ${producto.stock}
              </p>

              <button
                type="button"
                class="btn btn-dark btn-agregar"
                data-id="${producto.id}"
                ${botonDeshabilitado}
              >
                Agregar al carrito
              </button>

            </div>

          </article>

        </div>
      `;
    }

  });
  asignarEventosAgregar(productosContainer);
}

function renderizarCatalogo(listaProductos = productos) {

  if (!catalogoContainer) {
    return;
  }

  catalogoContainer.innerHTML = "";


  if (listaProductos.length === 0) {

    catalogoContainer.innerHTML = `
      <div class="col-12 text-center">
        <p>No encontramos perfumes con esos filtros.</p>
      </div>
    `;

    return;
  }


  listaProductos.forEach((producto) => {

    let estadoStock = "";
    let claseStock = "";
    let botonDeshabilitado = "";


    if (producto.stock === 0) {

      estadoStock = "Agotado";
      claseStock = "text-bg-danger";
      botonDeshabilitado = "disabled";

    } else if (producto.stock <= 5) {

      estadoStock = "Últimas unidades";
      claseStock = "text-bg-warning";

    } else {

      estadoStock = "Disponible";
      claseStock = "text-bg-success";

    }


    catalogoContainer.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">

        <article class="card product-card h-100">

          <img
            src="${rutaBase}${producto.imagen}"
            class="card-img-top product-image"
            alt="Perfume ${producto.nombre}"
          >

          <div class="card-body">

            <span class="badge ${claseStock}">
              ${estadoStock}
            </span>

            <h2 class="h4 mt-3">
              ${producto.nombre}
            </h2>

            <p>
              ${producto.descripcion}
            </p>

            <p>
              Categoría: ${producto.categoria}
            </p>

            <p>
              Aroma: ${producto.aroma}
            </p>

            <p class="product-price">
              $${producto.precio.toLocaleString("es-CO")}
            </p>

            <p>
              Stock: ${producto.stock}
            </p>

            <button
              type="button"
              class="btn btn-dark btn-agregar"
              data-id="${producto.id}"
              ${botonDeshabilitado}
            >
              Agregar al carrito
            </button>

          </div>

        </article>

      </div>
    `;

  });


  asignarEventosAgregar(catalogoContainer);
}

function filtrarProductos() {

  let resultado = [...productos];


  const textoBusqueda =
    buscador.value.trim().toLowerCase();

  const categoria =
    filtroCategoria.value;

  const aroma =
    filtroAroma.value;

  const stock =
    filtroStock.value;


  if (textoBusqueda !== "") {

    resultado = resultado.filter((producto) => {

      return producto.nombre
        .toLowerCase()
        .includes(textoBusqueda);

    });

  }


  if (categoria !== "") {

    resultado = resultado.filter((producto) => {

      return producto.categoria === categoria;

    });

  }


  if (aroma !== "") {

    resultado = resultado.filter((producto) => {

      return producto.aroma === aroma;

    });

  }


  if (stock === "disponible") {

    resultado = resultado.filter((producto) => {

      return producto.stock > 0;

    });

  }


  if (stock === "agotado") {

    resultado = resultado.filter((producto) => {

      return producto.stock === 0;

    });

  }


  renderizarCatalogo(resultado);
}


// ======================================================
// 7. ACTUALIZAR CONTADOR DEL CARRITO
// ======================================================

function actualizarContadorCarrito() {

  if (!cartCount) {
    return;
  }

  let totalUnidades = 0;

  carrito.forEach((item) => {
    totalUnidades += item.cantidad;
  });

  cartCount.textContent = totalUnidades;
}


// ======================================================
// 8. RENDERIZAR CARRITO
// ======================================================

function renderizarCarrito() {

  if (!carritoContenido) {
    return;
  }

  if (carrito.length === 0) {

    carritoContenido.innerHTML = `
      <p>Tu carrito está vacío.</p>
    `;

    return;
  }


  carritoContenido.innerHTML = "";


  // Mostramos cada producto del carrito
  carrito.forEach((item) => {

    const subtotal =
      item.precio * item.cantidad;


    carritoContenido.innerHTML += `
      <article class="cart-item mb-4">

        <h3 class="h5">
          ${item.nombre}
        </h3>

        <p>
          Precio:
          $${item.precio.toLocaleString("es-CO")}
        </p>

        <div class="d-flex align-items-center gap-2 mb-3">

          <button
            type="button"
            class="btn btn-outline-dark btn-sm btn-restar"
            data-id="${item.id}"
          >
            -
          </button>

          <span>
            ${item.cantidad}
          </span>

          <button
            type="button"
            class="btn btn-outline-dark btn-sm btn-sumar"
            data-id="${item.id}"
          >
            +
          </button>

        </div>

        <p>
          Subtotal:
          $${subtotal.toLocaleString("es-CO")}
        </p>

        <button
          type="button"
          class="btn btn-outline-danger btn-sm btn-eliminar"
          data-id="${item.id}"
        >
          Eliminar
        </button>

      </article>
    `;
  });


  // Calculamos el total completo
  const totalCarrito = carrito.reduce(
    (total, item) => {

      return total +
        (item.precio * item.cantidad);

    },
    0
  );


  // Mostramos total y botón vaciar
  carritoContenido.innerHTML += `
    <div class="border-top pt-3">

      <h3 class="h5">
        Total:
        $${totalCarrito.toLocaleString("es-CO")}
      </h3>

      <a
        href="${rutaBase}pages/checkout.html"
        class="btn btn-dark w-100 mt-3"
      >
        Finalizar compra
      </a>

      <button
        type="button"
        class="btn btn-outline-danger w-100 mt-3 btn-vaciar"
      >
        Vaciar carrito
      </button>

    </div>
  `;


  // Los botones ya existen, ahora les ponemos eventos
  asignarEventosCarrito();
}

// ======================================================
// 8. RENDERIZAR CHECKOUT
// ======================================================

function renderizarCheckout() {

  if (!checkoutResumen || !checkoutTotal) {
    return;
  }


  if (carrito.length === 0) {

    checkoutResumen.innerHTML = `
      <p>Tu carrito está vacío.</p>

      <a
        href="productos.html"
        class="btn btn-outline-dark mt-3"
      >
        Ver productos
      </a>
    `;

    checkoutTotal.textContent = "$0";


    if (btnFinalizarCompra) {
      btnFinalizarCompra.disabled = true;
    }

    return;
  }


  checkoutResumen.innerHTML = "";


  carrito.forEach((item) => {

    const subtotal =
      item.precio * item.cantidad;


    checkoutResumen.innerHTML += `
      <article class="mb-4">

        <h3 class="h6">
          ${item.nombre}
        </h3>

        <p class="mb-1">
          Cantidad: ${item.cantidad}
        </p>

        <p class="mb-1">
          Precio:
          $${item.precio.toLocaleString("es-CO")}
        </p>

        <p class="fw-bold">
          Subtotal:
          $${subtotal.toLocaleString("es-CO")}
        </p>

      </article>
    `;

  });


  const total =
    carrito.reduce((acumulador, item) => {

      return acumulador +
        (item.precio * item.cantidad);

    }, 0);


  checkoutTotal.textContent =
    `$${total.toLocaleString("es-CO")}`;


  if (btnFinalizarCompra) {
    btnFinalizarCompra.disabled = false;
  }

}


// ======================================================
// 9. EVENTOS INTERNOS DEL CARRITO
// +  -  Eliminar  Vaciar
// ======================================================

function asignarEventosCarrito() {

  // --------------------------
  // BOTONES SUMAR
  // --------------------------

  const botonesSumar =
    carritoContenido.querySelectorAll(".btn-sumar");


  botonesSumar.forEach((boton) => {

    boton.addEventListener("click", () => {

      const productoId =
        Number(boton.dataset.id);


      const productoEnCarrito =
        carrito.find((item) => {
          return item.id === productoId;
        });


      if (
        productoEnCarrito.cantidad <
        productoEnCarrito.stock
      ) {

        productoEnCarrito.cantidad++;

      } else {

        console.log(
          "No hay más unidades disponibles"
        );

      }


      actualizarCarrito();

    });

  });


  // --------------------------
  // BOTONES RESTAR
  // --------------------------

  const botonesRestar =
    carritoContenido.querySelectorAll(".btn-restar");


  botonesRestar.forEach((boton) => {

    boton.addEventListener("click", () => {

      const productoId =
        Number(boton.dataset.id);


      const productoEnCarrito =
        carrito.find((item) => {
          return item.id === productoId;
        });


      if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
      }


      actualizarCarrito();

    });

  });


  // --------------------------
  // BOTONES ELIMINAR
  // --------------------------

  const botonesEliminar =
    carritoContenido.querySelectorAll(".btn-eliminar");


  botonesEliminar.forEach((boton) => {

    boton.addEventListener("click", () => {

      const productoId =
        Number(boton.dataset.id);


      const indiceProducto =
        carrito.findIndex((item) => {
          return item.id === productoId;
        });


      if (indiceProducto !== -1) {

        carrito.splice(
          indiceProducto,
          1
        );

      }


      actualizarCarrito();

    });

  });


  // --------------------------
  // BOTÓN VACIAR CARRITO
  // --------------------------

  const botonVaciar =
    carritoContenido.querySelector(".btn-vaciar");


  botonVaciar.addEventListener("click", () => {

    const confirmar =
      confirm(
        "¿Seguro que deseas vaciar el carrito?"
      );


    if (confirmar) {

      carrito.splice(
        0,
        carrito.length
      );

      actualizarCarrito();

    }

  });

}


// ======================================================
// 10. ACTUALIZAR TODO EL CARRITO
// ======================================================

function actualizarCarrito() {

  guardarCarrito();

  actualizarContadorCarrito();

  renderizarCarrito();

}


function agregarProductoAlCarrito(productoId) {

  const productoEncontrado =
    productos.find((producto) => {
      return producto.id === productoId;
    });


  if (!productoEncontrado) {
    return;
  }


  if (productoEncontrado.stock === 0) {
    return;
  }


  const productoEnCarrito =
    carrito.find((item) => {
      return item.id === productoId;
    });


  if (productoEnCarrito) {

    if (
      productoEnCarrito.cantidad <
      productoEncontrado.stock
    ) {

      productoEnCarrito.cantidad++;

    } else {

      alert(
        "No hay más unidades disponibles de este producto."
      );

      return;

    }

  } else {

    carrito.push({
      ...productoEncontrado,
      cantidad: 1
    });

  }


  actualizarCarrito();
}

function asignarEventosAgregar(contenedor) {

  if (!contenedor) {
    return;
  }


  const botones =
    contenedor.querySelectorAll(".btn-agregar");


  botones.forEach((boton) => {

    boton.addEventListener("click", () => {

      const productoId =
        Number(boton.dataset.id);

      agregarProductoAlCarrito(productoId);

    });

  });

}

// ======================================================
// 11. API DE FRAGANCIAS
// ======================================================

async function cargarFraganciasAPI() {

  if (!apiProductosContainer || !apiEstado) {
    return;
  }

  apiEstado.innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">
        Cargando...
      </span>
    </div>

    <p class="mt-2">
      Cargando fragancias...
    </p>
  `;

  try {

    const respuesta = await fetch(
      "https://dummyjson.com/products/category/fragrances"
    );

    if (!respuesta.ok) {
      throw new Error(
        "No se pudieron obtener las fragancias."
      );
    }

    const datos = await respuesta.json();

    renderizarFraganciasAPI(datos.products);

  } catch (error) {

    console.error("Error al consultar la API:", error);

    apiEstado.innerHTML = `
      <div class="alert alert-danger" role="alert">
        No pudimos cargar las fragancias en este momento.
      </div>
    `;

  }

}

function renderizarFraganciasAPI(productosAPI) {

  apiEstado.innerHTML = "";

  apiProductosContainer.innerHTML = "";

  productosAPI.forEach((producto) => {

    apiProductosContainer.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">

        <article class="card product-card h-100">

          <img
            src="${producto.thumbnail}"
            class="card-img-top product-image"
            alt="${producto.title}"
          >

          <div class="card-body">

            <span class="badge text-bg-secondary">
              API
            </span>

            <h3 class="h5 mt-3">
              ${producto.title}
            </h3>

            <p>
              ${producto.description}
            </p>

            <p>
              <strong>Marca:</strong>
              ${producto.brand || "No disponible"}
            </p>

            <p>
              <strong>Rating:</strong>
              ${producto.rating}
            </p>

            <p>
              <strong>Precio de referencia:</strong>
              USD $${producto.price}
            </p>

          </div>

        </article>

      </div>
    `;

  });

}

// ======================================================
// 11. INICIAR LA PÁGINA
// ======================================================

renderizarDestacados();

renderizarCatalogo();

actualizarContadorCarrito();

renderizarCarrito();

renderizarCheckout();

cargarFraganciasAPI();

// ==============================
// EVENTOS DE LOS FILTROS
// ==============================

if (buscador) {
  buscador.addEventListener(
    "input",
    filtrarProductos
  );
}

if (filtroCategoria) {
  filtroCategoria.addEventListener(
    "change",
    filtrarProductos
  );
}

if (filtroAroma) {
  filtroAroma.addEventListener(
    "change",
    filtrarProductos
  );
}

if (filtroStock) {
  filtroStock.addEventListener(
    "change",
    filtrarProductos
  );
}

if (checkoutForm) {

  checkoutForm.addEventListener("submit", (evento) => {

    evento.preventDefault();


    if (carrito.length === 0) {
      return;
    }


    const nombre =
      document.getElementById("nombre")
        .value
        .trim();


    checkoutMensaje.innerHTML = `
      <div
        class="alert alert-success"
        role="alert"
      >
        ¡Gracias por tu compra, ${nombre}!

        Tu pedido fue registrado correctamente.
      </div>
    `;


    carrito.splice(0, carrito.length);


    actualizarCarrito();

    renderizarCheckout();

    checkoutForm.reset();

  });

}

