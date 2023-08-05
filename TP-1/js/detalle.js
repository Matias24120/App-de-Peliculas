// detalle.js
const containerDatos = document.getElementById('containerDatos');
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const nombre = params.get('name'); // Obtenemos el nombre del Pokémon de los parámetros de la URL
const endPoint = params.get('url'); // Obtenemos la URL de la API de los parámetros de la URL

// Función para obtener los detalles del Pokémon desde la API
fetch(endPoint) 
    .then(res => res.json())
    .then(json => {
        // Una vez que tenemos los detalles del Pokémon, llenamos los elementos en detalle.html
        const datos = json;
        containerDatos.innerHTML = `
            <li><span><strong>Nombre:</strong></span> ${datos.name}</li>
            <li><span><strong>Base experience:</strong></span> ${datos.base_experience}</li>
            <li><span><strong>Height:</strong></span> ${datos.height} ft</li>
            <li><span><strong>Weight:</strong></span> ${datos.weight} kg</li>
            <li><span><strong>Id:</strong></span> ${datos.id}</li>
        `;
    })
    .catch(error => {
        console.error(error);
    });
