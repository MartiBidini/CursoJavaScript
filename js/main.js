
let Perfumes=[];

async function cargarProductos() {
    
    const productos = await fetch("js/productos.json");
    
    Perfumes = await productos.json();
    
    MostrarPerfumes(Perfumes);
    AñadirAlCarrito();
}

cargarProductos();

//Cards de Perfumes
const ContenedorPerfumes = document.getElementById("contenedor_perfumes");

function MostrarPerfumes(Perfumes){

    Perfumes.forEach(perfume => {

        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${perfume.imagen}" alt="${perfume.Nombre}">
            <h3>${perfume.Nombre}</h3>
            <p class="info">${perfume.Categoria}</p>
            <p class="precio">$${perfume.Precio.toLocaleString()}</p>
            <button class="btn-agregar" id="agregar-${perfume.id}">Añadir al carrito</button>
        `;
        
        ContenedorPerfumes.appendChild(div);
    });
}

//Panel de carrito

const botonAbrirCarrito = document.getElementById("abrir-carrito");
const botonCerrarCarrito = document.getElementById("cerrar-carrito");
const panelCarrito = document.getElementById("panel_carrito");

botonAbrirCarrito.addEventListener("click", (evento) => {
    evento.preventDefault();
    panelCarrito.classList.add("activo");
});

botonCerrarCarrito.addEventListener("click", () => {
    panelCarrito.classList.remove("activo");
});


//Funcion de boton de las cards "Añadir al carrito"

let Carrito = JSON.parse(localStorage.getItem("MiCarrito")) || [];

function AñadirAlCarrito(){

    const BotonAñadirCarrito = document.querySelectorAll(".btn-agregar");

    BotonAñadirCarrito.forEach(boton=> {
    
    boton.addEventListener("click",function(){  

    const idBoton = boton.id.split("-")[1];
        const PerfumeElegido = Perfumes.find(perfume => perfume.id == idBoton);
    
        Carrito.push(PerfumeElegido);
        
        localStorage.setItem("MiCarrito", JSON.stringify(Carrito));
        
        mostrarCarrito();
        mostrarMensajeToast();
});
});
}

//Items en el carrito

const contenedorCarritoItems = document.getElementById("contenedor_items_carrito");

function mostrarCarrito() {
    
    contenedorCarritoItems.innerHTML = "";

    Carrito.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto_en_carrito"); 

        
        div.innerHTML = `
            <p>${producto.Nombre}</p>
            <p>Precio: $${producto.Precio.toLocaleString()}</p>
            <button class="boton-eliminar" id="eliminar-${producto.id}"> 
            <i class="fa-solid fa-trash"></i>
            </button>
        `;

        contenedorCarritoItems.appendChild(div);
        });

        const precioTotal = document.getElementById("precio-total");
        const totalCalculado = Carrito.reduce( (acumulador, producto) => acumulador + producto.Precio, 0 );
        precioTotal.innerText = totalCalculado.toLocaleString();

        const botonesTachoBasura = document.querySelectorAll(".boton-eliminar");
        botonesTachoBasura.forEach(botonBasura => {
        botonBasura.addEventListener("click", () => {
            
            const idBoton = botonBasura.id.split("-")[1];
            
            eliminarDelCarrito(idBoton);
            }); 
    });

            const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.innerText = Carrito.length;
}

function eliminarDelCarrito(idQueQuieroBorrar){
    
    Carrito = Carrito.filter(producto => producto.id != idQueQuieroBorrar);
    
    localStorage.setItem("MiCarrito", JSON.stringify(Carrito));
    mostrarCarrito();
}

function mostrarMensajeToast() {
    const toast = document.getElementById("toast-mensaje");
    toast.classList.add("mostrar");
    
    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 2500); 
}

    mostrarCarrito();

    //Boton vaciar compra

    const botonVaciar = document.getElementById("vaciar-carrito");

    botonVaciar.addEventListener("click", () => {
    Carrito = []; 
    
    localStorage.setItem("MiCarrito", JSON.stringify(Carrito)); 

    mostrarCarrito(); 
});

//Boton Finalizar Compra

const botonFinalizar = document.getElementById("finalizar-compra");

botonFinalizar.addEventListener("click", () => {
    
    if(Carrito.length === 0){
        return; 
    }

    Carrito = [];
    localStorage.setItem("MiCarrito", JSON.stringify(Carrito));
    mostrarCarrito();

    const toastMensajeCompra = document.getElementById("toast-mensaje");
    
    toastMensajeCompra.innerText = "¡Gracias por tu compra! Preparando envío..."; 
    toastMensajeCompra.classList.add("mostrar"); 

    setTimeout(() => {
        toastMensajeCompra.classList.remove("mostrar");
        setTimeout(() => {
            toastMensajeCompra.innerText = "¡Producto agregado al carrito!"; 
        }, 500); 
        
    }, 3000);
});