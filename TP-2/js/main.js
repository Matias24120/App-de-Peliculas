let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula col-lg-3 col-md-4 col-sm-6">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title} <button id="buttonApi" type="button"><img src= "img/favoritos.png" width= "20px" height= "20px"/></button></h3>
						 <!-- MODIFIQUE EL PARAMETRO DE URL DE name por id -->
						<a class="btn btn-primary" href= "detalle.html?id=${pelicula.id}">Ver detalle</a>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();


//Funcionamiento del Buscador


	const formBusqueda = document.getElementById('formBusqueda');
	formBusqueda.addEventListener('submit', (event) => {
	  event.preventDefault(); // Evita el comportamiento predeterminado del envío del formulario

	  const inputBusqueda = document.getElementById('inputBusqueda');
	  const busqueda = inputBusqueda.value;

	  // Realiza la lógica de búsqueda de películas
	  buscarPeliculas(busqueda);
	});

	const buscarPeliculas = async (busqueda) => {
  try {
    const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&query=${busqueda}`);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      const resultados = datos.results;

      // Muestra los resultados en la Pagina.
      mostrarResultadosBusqueda(resultados);
    } else {
      console.log('Error en la respuesta del servidor');
    }
  } catch (error) {
    console.log('Error en la búsqueda de películas:', error);
  }
};


const mostrarResultadosBusqueda = (resultados) => {
  let peliculas = '';

  resultados.forEach((pelicula) => {
    peliculas += `
      <div class="pelicula col-lg-3 col-md-4 col-sm-6">
        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        <h3 class="titulo">${pelicula.title}</h3>
        <a class="btn btn-primary" href="../detalle/detalle.html?name=${pelicula.poster_path}">Ver detalle</a>
      </div>
    `;
  });

  document.getElementById('contenedor').innerHTML = peliculas;
};

