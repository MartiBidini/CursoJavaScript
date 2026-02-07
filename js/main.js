
let Total;

const Perfumes=[
    {Nombre:"Yara Pink",Categoria:"Mujer",Precio:82000},
    {Nombre:"Mandarin Sky",Categoria:"Hombre",Precio:85000},
    {Nombre:"Fakhar Black",Categoria:"Hombre",Precio:60000},
    {Nombre:"Yum Yum",Categoria:"Mujer",Precio:80000},
    {Nombre:"9 PM",Categoria:"Hombre",Precio:90000},
    {Nombre:"Yara Candy",Categoria:"Mujer",Precio:85000},
    {Nombre:"Club de Nuit Intense",Categoria:"Hombre",Precio:95000},
    {Nombre:"Hawas Ice",Categoria:"Hombre",Precio:70000},
    {Nombre:"Honor & Glory",Categoria:"Mujer",Precio:80000},
    {Nombre:"The Kingdom For Men",Categoria:"Hombre",Precio:90000},
]

let ElegirPerfume=prompt("Bienvenido a Olfate-e Perfumeria,Si desea ver el catalogo eliga 1,si desea salir eliga 2");

    while(ElegirPerfume=="1"){
    
        MostrarCatalogo();

        ElegirPerfume=prompt("Si desea continuar escriba 1 sino para salir escriba 2");
        
        if(ElegirPerfume=="1"){
        MostrarCatalogo(); 
    }
        }


function MostrarCatalogo(){
    let Catalogo="";
    
    for(let i=0;i<Perfumes.length;i++){
        Catalogo +=
    
        "Nombre: "+ Perfumes[i].Nombre + "\n" +
        "Categoria: "+ Perfumes[i].Categoria + "\n" +
        "Precio: $"+ Perfumes[i].Precio + "\n"+
        "-------------" + "\n" ;
    }
    
    alert(Catalogo);

}

function FiltrarCategoria(){
    let ListaPerfume="";
    let Filtrar=prompt("Te gustaria filtrar Perfumes por Hombre o Mujer");
        for(const perfume of Perfumes){
        
        if(perfume.Categoria==Filtrar){
            ListaPerfume=ListaPerfume+perfume.Nombre + "\n";
        }
    }
    alert(ListaPerfume);
    }

function CalcularDescuento(Total){
    const Descuento=(Total/100)*15;
    let PrecioFinal=Total-Descuento;
    alert("Precio final del resumen $"+ PrecioFinal );
}





