

// Obtener los parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const peliculaId = urlParams.get('id');
const endPoint = `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX`;

// Obtener referencias a los elementos del DOM
const nombrePeliculaElement = document.getElementById('nombrePelicula');
const posterPeliculaElement = document.getElementById('posterPelicula');
const descripcionElement = document.getElementById('descripcion');
const lanzamientoElement = document.getElementById('lanzamiento');

// Función para cargar los detalles de la película
const cargarDetallePelicula = async () => {
  try {
    const respuesta = await fetch(endPoint);
    if (respuesta.status === 200) {
      const pelicula = await respuesta.json();

      // Asignar los valores a los elementos del DOM
      nombrePeliculaElement.textContent = pelicula.title;
      posterPeliculaElement.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
      descripcionElement.textContent = pelicula.overview;
      lanzamientoElement.textContent = pelicula.release_date;
    } else {
      console.log('Error en la respuesta del servidor');
    }
  } catch (error) {
    console.log('Error al cargar los detalles de la película:', error);
  }
};

// Cargar los detalles de la película al cargar la página
cargarDetallePelicula();
