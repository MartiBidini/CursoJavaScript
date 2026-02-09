
let TotalCompra=0;
let ListaDePerfumes;

const Perfumes=[
    {Numero:1,Nombre:"Yara Pink",Categoria:"MUJER",Precio:82000},
    {Numero:2,Nombre:"Mandarin Sky",Categoria:"HOMBRE",Precio:85000},
    {Numero:3,Nombre:"Fakhar Black",Categoria:"HOMBRE",Precio:60000},
    {Numero:4,Nombre:"Yum Yum",Categoria:"MUJER",Precio:80000},
    {Numero:5,Nombre:"9 PM",Categoria:"HOMBRE",Precio:90000},
    {Numero:6,Nombre:"Yara Candy",Categoria:"MUJER",Precio:85000},
    {Numero:7,Nombre:"Club de Nuit Intense",Categoria:"HOMBRE",Precio:95000},
    {Numero:8,Nombre:"Hawas Ice",Categoria:"HOMBRE",Precio:70000},
    {Numero:9,Nombre:"Honor & Glory",Categoria:"MUJER",Precio:80000},
    {Numero:10,Nombre:"The Kingdom For Men",Categoria:"HOMBRE",Precio:90000},
]
console.table(Perfumes)

let IniciarPrograma=prompt("Bienvenido a Olfate-e Perfumeria,Si desea comprar eliga 1,si desea salir presiome cualquier tecla");

    while(IniciarPrograma==1){      
        
        FiltrarCategoria(ListaDePerfumes);

        let PrecioDelPerfume=SeleccionarPerfume();

        TotalCompra=TotalCompra + PrecioDelPerfume;

        alert("Total Actual en el Carrito: $" + TotalCompra);
        
        IniciarPrograma = prompt("¿Desea volver al menu? 1-SI, Otro- Ir al proceso de pago");
        
        }
    
        if(TotalCompra > 0 ){
    
        let ElegirPago=parseInt(prompt("Si desea pagar con tarjeta eliga 1 si es con tranferencia(15% de descuento) eliga 2"));
        while(ElegirPago!=1 && ElegirPago !=2 || isNaN(ElegirPago)){
            alert("Opcion incorrecta");
            ElegirPago=parseInt(prompt("Si desea pagar con tarjeta eliga 1 si es con tranferencia(15% de descuento) eliga 2"));
        }
        
        if(ElegirPago==1){ 
            alert("Usted eligio pago con tarjeta, debe abonar: $" + TotalCompra);
        }
        else {
            CalcularDescuento(TotalCompra);
        }
        alert("Se te enviara un mensaje para continuar con el pago, Muchas Gracias por tu compra!!");
    }

function SeleccionarPerfume(){
    let PerfumeElegido="";
    let PrecioGuardado=0;
    
    let ElegirPerfume=parseInt(prompt("Selecciona el perfume que deseas comprar escribiendo su Numero(1-10)"));
    while(ElegirPerfume <1 || ElegirPerfume > 10 || isNaN(ElegirPerfume)  ){
        ElegirPerfume=parseInt(prompt("Error, Perfume inexistente, escriba un perfume que tenga el numero del 1 al 10"));
    }
    if(ElegirPerfume >= 1 || ElegirPerfume <=10){
        for(const perfume of Perfumes){
        if(perfume.Numero==ElegirPerfume){
            PerfumeElegido="Agregaste al Carrito: " + perfume.Nombre + " - Precio: $" + perfume.Precio;
        PrecioGuardado=perfume.Precio;
        }
        }
    }
    alert(PerfumeElegido);
    return PrecioGuardado;
    
}

        function FiltrarCategoria(ListaDePerfumes){
    ListaDePerfumes="";
    
    let Filtrar=prompt("Queres perfumes de Hombre o Mujer").toUpperCase();
    
    while(Filtrar!="HOMBRE" && Filtrar!="MUJER")
        {
        Filtrar = prompt("Opcion invalida, elegí HOMBRE o MUJER").toUpperCase();
        }
        
        for(const perfume of Perfumes){
        
            if(perfume.Categoria==Filtrar){
            ListaDePerfumes=ListaDePerfumes+ "Numero: " + perfume.Numero + "--" + perfume.Nombre + " - Precio: $" + perfume.Precio + "\n";
        }
    }
    alert(ListaDePerfumes);
    }

function CalcularDescuento(TotalCompra){
    const Descuento=(TotalCompra/100)*15;
    let PrecioFinal=TotalCompra-Descuento;
    alert("Precio final con 15% de descuento por tranferencia $"+ PrecioFinal );
}






