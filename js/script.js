let paginaActual = 1;
const elementosPorPagina = 24;
const totalPokemon = 648;
const urlBase = 'https://pokeapi.co/api/v2/pokemon';
const pokemonList = document.getElementById('pokemonList');
let enModoBusqueda = false;

async function cargarPagina(pagina) {
    const offset = (pagina - 1) * elementosPorPagina;
    const url = `${urlBase}?limit=${elementosPorPagina}&offset=${offset}`;
            
    // Mostrar el indicador de carga
    document.getElementById('loadingIndicator').style.display = 'block';

    try {
        const response = await fetch(url);
        const data = await response.json();
        await cargarSprites(data.results);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    } finally {
        // Ocultar el indicador de carga después de completar la carga
        document.getElementById('loadingIndicator').style.display = 'none';
    }
}

async function cargarSprites(resultados) {
    const promises = resultados.map(pokemon => obtenerDetallesPokemon(pokemon.url));
    const pokemonDetails = await Promise.all(promises);
    // Ordenar los resultados antes de mostrarlos
    const sortedDetails = pokemonDetails.sort((a, b) => a.id - b.id);
    sortedDetails.forEach(mostrarPokemon);
}

async function obtenerDetallesPokemon(url) {
    try {
        const response = await fetch(url);
        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
    }
}

function mostrarPokemon(pokemon) {
    pokemonList.innerHTML += `
        <a href="pokemon?id=${pokemon.id}&name=${pokemon.name}">
            <div class="pokemon ${pokemon.name}">
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="imagen de ${pokemon.name}" width="150" height="150" loading="lazy">
                <div class="id_nombre">
                    <p class="id_pokedex">#${pokemon.id}</p>
                    <p class="nombre_pokedex">${pokemon.name}</p>
                </div>
                <div class="${pokemon.name}_tipos tipos"></div>
                <div class="medidas">
                    <p class="peso">${pokemon.weight / 10} kg</p>
                    <p class="altura">${pokemon.height / 10} m</p>
                </div>
            </div>
        </a>
    `;
    comprobarTipos(pokemon.types, pokemon.name);
}

async function comprobarTipos(poketypes, nombre) {
    const contenedorPokemonInd = document.querySelector(`.${nombre}_tipos`);
    contenedorPokemonInd.innerHTML = "";

    for (const tipos of poketypes) {
        switch (tipos.type.name) {
            case "grass":
                tipos.type.name = "Planta";
                break;
            case "poison":
                tipos.type.name = "Veneno";
                break;
            case "fire":
                tipos.type.name = "Fuego";
                break;
            case "flying":
                tipos.type.name = "Volador";
                break;
            case "water":
                tipos.type.name = "Agua";
                break;
            case "bug":
                tipos.type.name = "Bicho";
                break;
            case "normal":
                tipos.type.name = "Normal";
                break;
            case "electric":
                tipos.type.name = "Eléctrico";
                break;
            case "ground":
                tipos.type.name = "Tierra";
                break;
            case "fairy":
                tipos.type.name = "Hada";
                break;
            case "fighting":
                tipos.type.name = "Lucha";
                break;
            case "psychic":
                tipos.type.name = "Psíquico";
                break;
            case "rock":
                tipos.type.name = "Roca";
                break;
            case "steel":
                tipos.type.name = "Acero";
                break;
            case "ice":
                tipos.type.name = "Hielo";
                break;
            case "ghost":
                tipos.type.name = "Fantasma";
                break;
            case "dragon":
                tipos.type.name = "Dragón";
                break;
            case "dark":
                tipos.type.name = "Siniestro";
                break;
            default:
                break;
        }
        if (nombre == "clefairy") {
            tipos.type.name = "Normal";
        }
        if (nombre == "clefable") {
            tipos.type.name = "Normal";
        }
        if (nombre == "mr-mime" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "gardevoir" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "marill" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "azumarill" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "wigglytuff" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "jigglypuff" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "granbull" && tipos.type.name == "Hada") {
            tipos.type.name = "Normal";
        }
        if (nombre == "togepi" && tipos.type.name == "Hada") {
            tipos.type.name = "Normal";
        }
        if (nombre == "togetic" && tipos.type.name == "Hada") {
            tipos.type.name = "Normal";
        }
        if (nombre == "togekiss" && tipos.type.name == "Hada") {
            tipos.type.name = "Normal";
        }
        if (nombre == "cleffa" && tipos.type.name == "Hada") {
            tipos.type.name = "Normal";
        }
        if (nombre == "snubbull" && tipos.type.name == "Hada") {
            tipos.type.name = "Normal";
        }
        if (nombre == "igglybuff" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "ralts" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "kirlia" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "mawile" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "mime-jr" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "cottonee" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "whimsicott" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        if (nombre == "azurill" && tipos.type.name == "Hada") {
            tipos.type.name = "";
        }
        contenedorPokemonInd.innerHTML += `
            <p class="${tipos.type.name}">${tipos.type.name}</p>
        `;
    }
}

        function cargarPaginaAnterior() {
            if (paginaActual > 1) {
                paginaActual--;
                cargarPagina(paginaActual);
            }
        }

        function cargarPaginaSiguiente() {
            if ((paginaActual * elementosPorPagina) < totalPokemon) {
                paginaActual++;
                cargarPagina(paginaActual);
            }
        }

        let cargando = false; // Nueva variable para rastrear si se está cargando

        async function cargarMasPokemon() {
            const alturaDeLaVentana = window.innerHeight;
            const alturaDelDocumento = document.documentElement.offsetHeight;
            const scrollActual = window.scrollY;
        
            // Verificar si ya se está cargando o estás en modo búsqueda
            if (cargando || enModoBusqueda) {
                return;
            }
        
            // Cambiar el umbral a 2000 para dispositivos móviles
            const umbralCarga = window.innerWidth <= 768 ? 2200 : 1000;
        
            // Agregar un pequeño margen para evitar cargar de golpe
            if (
                (alturaDelDocumento - (scrollActual + alturaDeLaVentana) < umbralCarga) &&
                ((paginaActual * elementosPorPagina) < totalPokemon)
            ) {
                cargando = true; // Establecer la variable de cargando
                cargarPaginaSiguiente();
                
                // Retraso breve para evitar carga excesiva
                await new Promise(resolve => setTimeout(resolve, 500));
                
                cargando = false; // Restablecer la variable de cargando
            }
        }        

        // Cargar la primera página al cargar la página
        cargarPagina(paginaActual);

        // Agregar el evento scroll para cargar más elementos al llegar al final de la página
        window.addEventListener('scroll', cargarMasPokemon);

        async function buscarPokemon() {
            const buscador = document.querySelector(".input-buscador").value.toLowerCase();
        
            if (buscador === "") {
                // Si el buscador está vacío, cargar la primera página
                enModoBusqueda = false;
                paginaActual = 1;
                const contenedorPokemon = document.querySelector("#pokemonList");
                contenedorPokemon.innerHTML = "";
                cargarPagina(paginaActual);
            } else {
                try {
                    enModoBusqueda = true;
                    const response = await fetch(`${urlBase}/${buscador}`);
                    const pokemon = await response.json();
                    pokemonList.innerHTML = ""; // Limpiar el contenido actual
                    mostrarPokemon(pokemon);
                    comprobarTipos(pokemon.types, pokemon.name);
                } catch (error) {
                    console.error('Error al buscar el Pokémon:', error);
                }
            }
        }        

        // Mostrar las sugerencias al escribir en el input
        async function mostrarSugerencias() {

            const response = await fetch(`${urlBase}?limit=648&offset=0`);
            const data = await response.json();
            let sugerencias = [];
            for (const poke of data.results) {
                let nombre = poke.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                sugerencias.push(nombre);
            }

            const input = document.querySelector(".input-buscador");
            const sugerenciasContainer = document.getElementById("sugerenciasContainer");

            // Limpiar sugerencias previas
            sugerenciasContainer.innerHTML = "";

            // Obtener el valor del input
            const filtro = input.value.toLowerCase();

            // Mostrar sugerencias solo si el filtro no está vacío
            if (filtro !== "") {
                sugerenciasContainer.style.display = "block";
                sugerencias.forEach(function(sugerencia) {
                    if (sugerencia.toLowerCase().includes(filtro)) {
                        const divSugerencia = document.createElement("div");
                        divSugerencia.innerHTML = sugerencia;
                        divSugerencia.addEventListener("click", function() {
                            input.value = sugerencia;
                            sugerenciasContainer.style.display = "none";
                            buscarPokemon();
                        });
                        sugerenciasContainer.appendChild(divSugerencia);
                    }
                });
            } else {
                sugerenciasContainer.style.display = "none";
            }
        }

        // Cerrar las sugerencias al hacer clic en cualquier parte del documento
        document.addEventListener("click", function(event) {
            const sugerenciasContainer = document.getElementById("sugerenciasContainer");
            if (event.target !== sugerenciasContainer && !sugerenciasContainer.contains(event.target)) {
                sugerenciasContainer.style.display = "none";
            }
        });

let busquedaActiva = false;

async function buscarTipo(tipo) {
    if (busquedaActiva) {
        // Si la búsqueda está en curso, detén la búsqueda actual
        busquedaActiva = false;
        return;
    }

    busquedaActiva = true;

    const contenedorPokemon = document.querySelector("#pokemonList");
    contenedorPokemon.innerHTML = "";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
        const pokemon = await response.json();

        for (const nombrePoke of pokemon.pokemon) {
            if (!busquedaActiva) {
                // Si la búsqueda ya no está activa, detén el bucle
                return;
            }

            try {
                const response = await fetch(`${urlBase}/${nombrePoke.pokemon.name}`);
                const pokemontipo = await response.json();

                if (pokemontipo.id <= 648) {
                    enModoBusqueda = true;
                    mostrarPokemon(pokemontipo);
                    comprobarTipos(pokemontipo.types, pokemontipo.name);
                } else {
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        busquedaActiva = false; // Restablecer el estado de la búsqueda al finalizar
    }
}

// Lógica para interrumpir la búsqueda al hacer clic en el filtro nuevamente
const filtro = document.querySelector(".btn-filtros"); // Reemplaza "tuFiltro" con el ID real de tu filtro

filtro.addEventListener("click", () => {
    busquedaActiva = false;
});


var filtroDiv = document.getElementById('filtroDiv');

function mostrarFiltros() {
    if (filtroDiv.style.display === 'none' || filtroDiv.style.display === '') {
        filtroDiv.style.display = 'grid';
    } else {
        filtroDiv.style.display = 'none';
    }
}