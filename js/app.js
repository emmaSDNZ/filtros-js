//variables 
const resultado = document.querySelector('#resultado')
const year = document.querySelector('#year')

//me trae el año actual
const max = new Date().getFullYear(),
      min = max - 10;


//evento
document.addEventListener("DOMContentLoaded", function(e) {

    //me renderiza los autos de la db
    mostrarAuto()

    //llea las opciones de año
    llenarSelect()
})

//funciones

function mostrarAuto(){

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

function llenarSelect(){
    console.log("llenando el select");

    for( let i = max; i >= min; i--){
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)
        console.log(i);
    }
}

