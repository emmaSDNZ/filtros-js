//variables
const year          = document.querySelector('#year')
const marca         = document.querySelector('#marca')
const minimo        = document.querySelector('#minimo')
const maximo        = document.querySelector('#maximo')
const transmision   = document.querySelector('#transmision')
const puertas       = document.querySelector('#puertas')
const color         = document.querySelector('#color')

console.log(transmision);
//contenedor de resultados
const resultado = document.querySelector('#resultado')


//me trae el año actual
const max = new Date().getFullYear(),
      min = max - 10;

//generamos un objeto paral a busqueda
const datosBusqueda = {
    marca: '',
    year:'',
    minimo: '',
    maximo: '',
    transmision: '',
    puertas: '',
    color : ''
}

//evento
document.addEventListener("DOMContentLoaded", function(e) {

    //me renderiza los autos de la db
    mostrarAutos(autos)

    //llea las opciones de año
    llenarSelect()
})

//eventListener para el evento de las opciones
marca.addEventListener('change', (e)=>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto()
});

year.addEventListener('change', (e)=>{
    datosBusqueda.year = e.target.value;
    filtrarAuto()
})

minimo.addEventListener('change', (e)=>{
    datosBusqueda.minimo = e.target.value
    filtrarAuto()
})

maximo.addEventListener('change', (e)=>{
    datosBusqueda.maximo = e.target.value
    filtrarAuto()
})

transmision.addEventListener('change', (e)=>{
    datosBusqueda.transmision = e.target.value
    filtrarAuto()
    console.log(datosBusqueda);
})
puertas.addEventListener('change', (e)=>{
    datosBusqueda.puertas = e.target.value
    filtrarAuto()
})
color.addEventListener('change', (e)=>{
    datosBusqueda.color = e.target.value
    filtrarAuto()
    console.log(datosBusqueda);
})


//funciones
function mostrarAutos(autos){

    //eliminar el HTML previo
    limpiarHTML()

    autos.forEach( auto =>{ 

        const {marca, modelo, year, precio,color, transmision, puertas} = auto

        //genero HTML
        const autoHTML = document.createElement(`P`);
        //genero el contenido del HTML
        autoHTML.textContent = `
           marca: ${marca} -${modelo} -${year} -${precio} -${color} -${transmision} -${puertas}
        `
        //inyecto en el HTML
        resultado.appendChild(autoHTML);
    })
}

//limpiar html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect(){
    
    for( let i = max; i >= min; i--){
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)
        console.log(i);
    }
}

//funcion que filtra segun la busqueda
function filtrarAuto() {

    //autos es la referencia de la base de datos 
    const resultado = autos
        .filter( filtrarMarca )
        .filter( filtrarYear )
        .filter( filtrarMinimo )
        .filter ( filtrarMaximo )
        .filter ( filtrarPuerta )
        .filter ( filtrarTrasmision )
        .filter ( filtrarColor )
    //console.log(resultado);
    if(resultado.length){

        //mostrar autos segun el filtro
        mostrarAutos(resultado)
    }else {
        noResultado ()
    }
}
    

//programacion funcional
function filtrarMarca (auto){
    
    const { marca } = datosBusqueda;
    if ( marca ){
        return auto.marca === marca
    }
    return auto;
    
}

function filtrarYear(auto) {
    const { year} = datosBusqueda;
    if( year ){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if( minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}    

function filtrarPuerta(auto){
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === parseInt( puertas );
    }
    return auto;
}

function filtrarTrasmision(auto){
    console.log(auto.transmision);
    const { transmision } = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision ;
    }
    return auto;
}


function filtrarColor (auto){
    const { color } = datosBusqueda;
    if( color ){
        return auto.color === color ;
    }
    return auto;
}

function noResultado(){

    limpiarHTML()
    
    const noResultado = document.createElement('div')
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No se encontraron busqueda'
    resultado.appendChild( noResultado );
}