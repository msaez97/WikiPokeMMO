let offset = 0; // Cuántos Pokémon se han mostrado
const limit = 100; // Cantidad de Pokémon a mostrar por página
let allPokemonData = []; // Para almacenar todos los datos de Pokémon
let currentType = null; // Para rastrear el tipo actual seleccionado

fetch('../pokedex.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Convierte el contenido a un objeto JSON
  })
  .then(data => {
    allPokemonData = data; // Guardar todos los datos
    mostrarPokemon(allPokemonData, offset, limit); // Mostrar los primeros 100 Pokémon
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

async function mostrarPokemon(data, offset, limit) {
    const slice = data.slice(offset, offset + limit); // Obtener solo la parte relevante del array

    slice.forEach(pokemon => {
        pokemonList.innerHTML += `
        <a href="pokemon?id=${pokemon.num_pokedex}">
            <div class="pokemon ${pokemon.nombre}">
                <img src="${pokemon.imgs["img_default"]}" alt="imagen de ${pokemon.nombre}" width="150" height="150" loading="lazy" />
                <div class="id_nombre">
                    <p class="id_pokedex">#${pokemon.num_pokedex}</p>
                    <p class="nombre_pokedex">${pokemon.nombre}</p>
                </div>
                <div class="tipos">
                <div class="${pokemon.tipo[0]}"><p>${pokemon.tipo[0]}</p></div>
                <div class="${pokemon.tipo[1]}"><p>${pokemon.tipo[1]}</p></div>
                </div>
                <div class="medidas">
                    <p class="peso">${pokemon.peso} kg</p>
                    <p class="altura">${pokemon.altura} m</p>
                </div>
            </div>
        </a>
    `;
    });

    offset += limit; // Aumentar el offset para la siguiente carga
}

// Función para filtrar Pokémon por tipo
function buscarTipo(tipo) {
    currentType = tipo; // Actualiza el tipo actual
    offset = 0; // Reinicia el offset
    pokemonList.innerHTML = ''; // Limpia la lista actual

    // Filtra los Pokémon por tipo
    const filteredData = allPokemonData.filter(pokemon => 
        Object.values(pokemon.tipo).includes(tipo)
    );

    mostrarPokemon(filteredData, offset, limit); // Muestra los Pokémon filtrados
}

// Función para mostrar todos los Pokémon
function mostrarTodos() {
    currentType = null; // Reinicia el tipo actual
    offset = 0; // Reinicia el offset
    pokemonList.innerHTML = ''; // Limpia la lista actual
    mostrarPokemon(allPokemonData, offset, limit); // Muestra todos los Pokémon
}

// Evento para cargar más Pokémon al hacer scroll
window.addEventListener('scroll', () => {
    // Cargar más Pokémon cuando el usuario esté a 200px del final de la lista
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 900) {
        let dataToLoad = currentType ? 
            allPokemonData.filter(pokemon => Object.values(pokemon.tipo).includes(currentType)) : 
            allPokemonData;

        if (offset < dataToLoad.length) { // Comprobar si hay más Pokémon por mostrar
            mostrarPokemon(dataToLoad, offset, limit);
        }
    }
});

// Función para buscar Pokémon por nombre o número de Pokédex al hacer clic en el botón
function buscarPokemon() {
    const input = document.querySelector('.input-buscador');
    const valor = input.value.trim(); // Obtener el valor del input y eliminar espacios
    if (valor.length === 0) return; // No hacer nada si el campo está vacío

    currentType = null; // Reinicia el tipo actual
    offset = 0; // Reinicia el offset
    pokemonList.innerHTML = ''; // Limpia la lista actual

    // Filtra los Pokémon por nombre o número de Pokédex
    const filteredData = allPokemonData.filter(pokemon => 
        pokemon.nombre.toLowerCase() === valor.toLowerCase() ||
        pokemon.num_pokedex === valor // Comparar el número de Pokédex
    );

    mostrarPokemon(filteredData, offset, limit); // Muestra el Pokémon buscado
}
