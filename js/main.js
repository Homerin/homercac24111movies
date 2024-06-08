// Añadir event listeners para los botones
document.getElementById("registerBtn").addEventListener("click", function() {
    window.location.href = "reg.html"; // Asegúrate de que esta ruta es correcta
});

document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "log.html"; // Asegúrate de que esta ruta es correcta
});

//----------------------------------------------------- PELICULAS POPULAR -----------------------------------------------------//

//--------------- 1. CONSUMO API ---------------//
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjY2OGI2NDhiYTEyOGExMWYyM2YyZmM4MDEwZWJmZSIsInN1YiI6IjY2NWM3NGE2YmRkNzhmNDgwNWMyNjg0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aB0-3X9NEP2MFGSMmFAdkCK1jk6B9HapjoOwLUm8JQA';
const API_TENDENCIA_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated'


const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }    
};    

function llamarAPIPrueba(page) {
    fetch(`${API_RATED_URL}?language=en-US&page=${page}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}    


function llamarAPI_TENDENCIA(page) {
    fetch(`${API_TENDENCIA_URL}?language=en-US&page=${page}`, options)
    .then(response => response.json())
    .then(data => dibujarDatosTendencia(data));
}    

function llamarAPI_ACLAMADA(page) {
    fetch(`${API_RATED_URL}?language=en-US&page=${page}`, options)
    .then(response => response.json())
    .then(data => dibujarDatosAclamada(data));
}


//--------------- 2. VARIABLES ---------------//

let currentPageTendencia = 1;
let currentPageAclamadas = 1;

//--------------- 3.1 FUNCIONES PARA HTML ---------------//

/**
 * Agrega el string obtenido por la función Pelicula(obj) al HTML index.html 
*/  
function dibujarDatosTendencia(json){
    const filas = json.results.map(obj => PeliculaTendencia(obj));
    document.querySelector('.tendenciasHoy .galeria .row-gap-3').innerHTML = filas.join('');
}    

function dibujarDatosAclamada(json){
    const filas = json.results.map(obj => PeliculaAclamada(obj));
    document.querySelector('.aclamadas .row-aclamadas').innerHTML = filas.join('');
}  

/**
 *  Crea el string completo para enviar al HTML 
*/
function PeliculaTendencia(obj) {
    return `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="movie-poster">
    <img class="img-fluid img-rounded" src="https://image.tmdb.org/t/p/w342/${obj.poster_path}">
    <div class="titulo-pelicula style-1">
    <h4>${obj.title}</h4>
    </div>
    </div>
    </div>`
}    

function PeliculaAclamada(obj) {
    return `<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
    <div class="movie-poster">
      <img class="img-fluid" src="https://image.tmdb.org/t/p/w342/${obj.poster_path}">
    </div>
  </div>
    `
}    


//--------------- 3.2 FUNCIONES PARA LOS BOTONES ---------------//


/**
 * Función para cargar la página siguiente de la API  
 * */ 
function cargarPaginaSiguiente(currentPage) {
    currentPage++;
    console.log(currentPage);
    return currentPage;
}    

/**
 * [SECCIÓN TENDENCIA]
 * Función para cargar la página anterior de la API  
 * */ 
function cargarPaginaAnterior(currentPage) {
    if (currentPage > 1) {
        currentPage--;
        console.log(currentPage);
        return currentPage;
    }    
    else {
        console.log(currentPage);
        return currentPage;
    }    
}    

function manejoPaginaTendencia(accion){
    if (accion=='anterior'){
        currentPageTendencia = cargarPaginaAnterior(currentPageTendencia);
    }    
    else {
        currentPageTendencia = cargarPaginaSiguiente(currentPageTendencia);
    }    
    llamarAPI_TENDENCIA(currentPageTendencia);
}    




//--------------- 4. EVENTOS ---------------//


//Agregar event listeners a los botones de tendencia
document.querySelector('.anterior-tendencia').addEventListener('click', function() {
    manejoPaginaTendencia('anterior');
});    

document.querySelector('.siguiente-tendencia').addEventListener('click', function() {
    manejoPaginaTendencia('siguiente');
});    


//--------------- 5. LLAMADA INICIAL A LA API ---------------//
console.log(currentPageTendencia)
llamarAPI_TENDENCIA(currentPageTendencia);

console.log(currentPageAclamadas);
llamarAPI_ACLAMADA(currentPageAclamadas);



