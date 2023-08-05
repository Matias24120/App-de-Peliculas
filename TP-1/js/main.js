let datos = []; // Variable para almacenar los datos de los Pokemones obtenidos

const apiButton = document.getElementById('apiButton');
const searchButton = document.getElementById('searchButton');
const ul = document.getElementById('lista');
const searchInput = document.getElementById('searchInput');

apiButton.addEventListener('click', fetchPokemonData);
searchButton.addEventListener('click', searchPokemon);

// Función para obtener los datos de los Pokémon desde la API
function fetchPokemonData() {
    const endPoint = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

    fetch(endPoint) 
    .then(res => res.json())
    .then(json => {
        datos = json.results; // Guardamos los datos de los Pokemones
        displayPokemonList(datos); // Mostramos la lista de Pokemones
    })
    .catch(error => {
        console.error(error);
    });
}

// Función para realizar la búsqueda de Pokémon
function searchPokemon() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredPokemons = datos.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchTerm);
    });

    displayPokemonList(filteredPokemons); // Mostramos la lista filtrada
}

// Función para mostrar la lista de Pokémon en la interfaz
function displayPokemonList(pokemonList) {
    ul.innerHTML = ""; // Limpiamos la lista actual

    pokemonList.forEach(pokemon => {
        ul.innerHTML += `<li>
                            <strong>${pokemon.name}</strong>
                            <a href="detalle.html?name=${pokemon.name}&url=${pokemon.url}">Ver detalle</a>
                        </li>`;
    });
}
