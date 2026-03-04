
const Perfumes=[
    {id: 1,Nombre:"Yara Pink",Categoria:"Mujer - Dia",Precio:82000,imagen:"images/YaraPink.png"},
    {id: 2,Nombre:"Mandarin Sky",Categoria:"Hombre - Dia o Noche",Precio:85000,imagen:"images/MandarinSky.png"},
    {id: 3,Nombre:"Fakhar Black",Categoria:"Hombre - Dia",Precio:60000,imagen:"images/FakharBlack.png"},
    {id: 4,Nombre:"Yum Yum",Categoria:"Mujer - Dia",Precio:80000,imagen:"images/ArmafYumYum.png"},
    {id: 5,Nombre:"Afnan 9 PM",Categoria:"Hombre - Noche",Precio:90000,imagen:"images/Afnan9PM.png"},
    {id: 6,Nombre:"Yara Candy",Categoria:"Mujer - Dia",Precio:85000,imagen:"images/YaraCandy.png"},
    {id: 7,Nombre:"Club de Nuit Intense",Categoria:"Hombre - Dia o Noche",Precio:95000,imagen:"images/ClubdeNuitIntense.png"},
    {id: 8,Nombre:"Hawas Ice",Categoria:"Hombre - Dia",Precio:70000,imagen:"images/HawasIce.png"},
    {id: 9,Nombre:"Honor & Glory",Categoria:"Mujer o Hombre - Dia o Noche ",Precio:80000,imagen:"images/HonorandGlory.png"},
    {id: 10,Nombre:"The Kingdom For Men",Categoria:"Hombre - Noche",Precio:90000,imagen:"images/TheKindomForMen.png"},
]

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

MostrarPerfumes(Perfumes);

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

const BotonAñadirCarrito = document.querySelectorAll(".btn-agregar");

function AñadirAlCarrito(){

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

AñadirAlCarrito();

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