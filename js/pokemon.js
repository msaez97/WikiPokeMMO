const id = new URLSearchParams(window.location.search);
const pokemonId = id.get("id");
const mensajeCarga = document.querySelector(".mensajeCarga");

getPokemon(pokemonId);

async function getPokemon(pokemonId) {
    try {
        // Mostrar mensaje de carga
        mensajeCarga.style.display = "block";

        // Convertir pokemonId a número para asegurar la correcta evaluación
        const numericPokemonId = parseInt(pokemonId, 10);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numericPokemonId}`);
        const pokemon = await response.json();

        let pokemonAnterior = null;
        let pokemonSiguiente = null;

        if (numericPokemonId >= 2 && numericPokemonId <= 647) {
            pokemonAnterior = await getPokemonData(numericPokemonId - 1);
            pokemonSiguiente = await getPokemonData(numericPokemonId + 1);
        } else if (numericPokemonId == 648) {
            pokemonAnterior = await getPokemonData(numericPokemonId - 1);
        } else {
            pokemonSiguiente = await getPokemonData(numericPokemonId + 1);
        }

        cartaPokemon(pokemon, pokemonAnterior, pokemonSiguiente);

    } catch (error) {
        console.error(error);
    }
}

async function getPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    return response.json();
}

function traducirTipo(tipo) {
    const traducciones = {
        "grass": "Planta",
        "poison": "Veneno",
        "fire": "Fuego",
        "flying": "Volador",
        "water": "Agua",
        "bug": "Bicho",
        "normal": "Normal",
        "electric": "Eléctrico",
        "ground": "Tierra",
        "fairy": "Hada",
        "fighting": "Lucha",
        "psychic": "Psíquico",
        "rock": "Roca",
        "steel": "Acero",
        "ice": "Hielo",
        "ghost": "Fantasma",
        "dragon": "Dragón",
        "dark": "Siniestro"
    };

    return traducciones[tipo] || tipo;
}

async function getPokemonAbilities(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    const abilities = data.abilities;

    const abilitiesData = await Promise.all(abilities.map(async (ability) => {
        const abilityResponse = await fetch(ability.ability.url);
        const abilityData = await abilityResponse.json();

        const translatedName = abilityData.names.find(name => name.language.name === 'es').name;
        const isHidden = ability.is_hidden;

        return { name: translatedName, isHidden: isHidden };
    }));

    return abilitiesData;
}

async function getPokemonEvolutions(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const data = await response.json();

        const evolutionChainUrl = data.evolution_chain.url;
        const evolutionChainResponse = await fetch(evolutionChainUrl);
        const evolutionChainData = await evolutionChainResponse.json();

        const evolutions = parseEvolutionChain(evolutionChainData.chain);

        return evolutions;
    } catch (error) {
        console.error(error);
        return {};
    }
}

async function getPokemonEggGroups(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const speciesData = await response.json();

        const eggGroupNames = speciesData.egg_groups.map(eggGroup => eggGroup.name);
        return eggGroupNames;
    } catch (error) {
        console.error(`Error al obtener los grupos de huevos para el Pokémon ${pokemonId}: ${error}`);
        return [];
    }
}

async function parseEvolutionChain(chain) {
    const evolution = {
        species: chain.species.name,
        isTriggeredByItem: chain.evolution_details.some(detail => detail.item),
        triggerItem: chain.evolution_details.find(detail => detail.item)?.item?.name,
    };

    // Obtener el nivel de evolución si existe
    const levelUpDetails = chain.evolution_details.find(detail => detail.trigger.name === "level-up");
    if (levelUpDetails) {
        evolution.minLevel = levelUpDetails.min_level;
    }

    try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.species}`);
        const speciesData = await speciesResponse.json();
        evolution.spriteUrl = speciesData.sprites.front_default;
    } catch (error) {
        console.error(`Error al obtener la URL de la imagen para ${evolution.species}: ${error}`);
    } finally {
        // Ocultar mensaje de carga después de que se complete la carga
        mensajeCarga.style.display = "none";
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
        evolution.evolvesTo = await Promise.all(
            chain.evolves_to.map(async subChain => parseEvolutionChain(subChain))
        );
    }

    return evolution;
}

async function cartaPokemon(pokemon, pokemonAnterior, pokemonSiguiente) {
    const nombrePokemon = document.querySelector(".cartaPokemon");
    const nombrePoke = pokemon.name;
    const tipos = pokemon.types.map(type => `<p class="${type.type.name}">${traducirTipo(type.type.name)}</p>`).join('');
    const imagen = pokemon.sprites.other["official-artwork"].front_default;;
    const peso = pokemon.weight / 10;
    const altura = pokemon.height / 10;

    const imagenPokeActual = pokemon.sprites.front_default;
    const imagenPokeAnterior = pokemonAnterior ? pokemonAnterior.sprites.front_default : "";
    const imagenPokeSiguiente = pokemonSiguiente ? pokemonSiguiente.sprites.front_default : "";

    const gruposHuevo = await getPokemonEggGroups(pokemon.id);
    const gruposHuevoHTML = gruposHuevo.map(grupo => `<p>${traducirGrupoHuevo(grupo)}</p>`).join('');

    const habilidadesData = await getPokemonAbilities(pokemon.id);
    const habilidadesHTML = habilidadesData.map(ability => {
        const isHiddenText = ability.isHidden ? "Habilidad Oculta: " : "Habilidad: ";
        return `<p class="PokeHabilidadesCarta">${isHiddenText}<a href="">${ability.name}</a></p>`;
    }).join('');

    const evoluciones = await getPokemonEvolutions(pokemon.id);
    const evolucionesHTML = renderEvolutions(evoluciones);

    const cartaInfo = `
        <div class="cartaInfo">
            <img class="imagenPoke" src="${imagen}" alt="imagen ${nombrePoke}" width="150" height="150">
            <button id="cambiarShiny" onclick="cambiarShiny()">Ver Shiny</button>
            <div class="infoPoke">
                ${pokemonAnterior ? `<a href="http://wiki-pokemmo.com/pokedex/pokemon.php?id=${pokemonAnterior.id}&name=${pokemonAnterior.name}"><img src="${imagenPokeAnterior}" alt="${pokemonAnterior.name}" width="32" height="32">←</a>` : ''}
                <p><img src="${imagenPokeActual}" alt="${nombrePoke}" width="32" height="32">${nombrePoke}</p>
                ${pokemonSiguiente ? `<a href="http://wiki-pokemmo.com/pokedex/pokemon.php?id=${pokemonSiguiente.id}&name=${pokemonSiguiente.name}">→<img src="${imagenPokeSiguiente}" alt="${pokemonSiguiente.name}" width="32" height="32"></a>` : ''}
            </div>
            <div class="cartaPokeTipos">
                ${tipos}
            </div>
        </div>
        <div class="cartaPokeGruposHuevo">
            <p class="grupoHuevoTitulo">Grupos Huevo</p>
            <div class="grupoHuevoInnerJs">
                ${gruposHuevoHTML}
            </div>
        </div>
        <div class="cartaPokeHabilidades">
            ${habilidadesHTML}
        </div>
        <div class="cartaMedidas">
            <p>Peso: ${peso}kg</p>
            <p>Altura: ${altura}m</p>
        </div>
        <div class="cartaPokeEvoluciones">
            <p style="padding: 0 .75rem;">Evoluciones</p>
            <div class="datosEvoPoke">
                ${evolucionesHTML}
            </div>
        </div>
        <div class="stats"></div>
        <div class="left-main">
            <h1>${nombrePoke}</h1>
        </div>
    `;

    nombrePokemon.innerHTML += cartaInfo;

    crearBarra(pokemon.stats[0].base_stat, "HP");
    crearBarra(pokemon.stats[1].base_stat, "ATQ");
    crearBarra(pokemon.stats[2].base_stat, "DEF");
    crearBarra(pokemon.stats[3].base_stat, "ATQESP");
    crearBarra(pokemon.stats[4].base_stat, "DEFESP");
    crearBarra(pokemon.stats[5].base_stat, "VEL");

    quitarHada(nombrePoke, ["mr-mime", "gardevoir", "marill", "azumarill", "wigglytuff", "jigglypuff", "igglybuff", "ralts", "kirlia", "mawile", "mime-jr", "cottonee", "whimsicott", "azurill"]);
}

function renderEvolutions(evolution) {
    if (!evolution.species) {
        return "<p>No hay información de evolución disponible.</p>";
    }

    let html = "";

    function renderNode(node) {
        html += `<div class="evolutionInfo">`;
        
        html += `<p>`;
        if (node.minLevel) {
            html += `Nvl: ${node.minLevel}`;
        }
        if (node.isTriggeredByItem) {
            html += `Itm: ${node.triggerItem}`;
        }
        html += `</p>`;

        // Agregar la imagen del Pokémon si está disponible
        if (node.spriteUrl) {
            html += `<img src="${node.spriteUrl}" alt="${node.species}" class="evolutionSprite">`;
        }

        html += `</div>`;

        if (node.evolvesTo && node.evolvesTo.length > 0) {
            node.evolvesTo.forEach(subNode => {
                renderNode(subNode);
            });
        }
    }

    renderNode(evolution);

    return html;
}


function crearBarra(valor, nombre) {
    const barra = document.createElement("div");
    barra.className = `rellena_barra${nombre}`;
    const fondo = document.createElement("div");
    fondo.className = `barra${nombre}`;
    fondo.style.width = "100%";

    const texto = document.createElement("p");
    texto.className = `texto${nombre}`;
    texto.innerHTML = `${nombre}`;

    const valorTexto = document.createElement("p");
    valorTexto.className = `textoStat`;
    valorTexto.innerHTML = `${valor}`;

    fondo.appendChild(texto);
    fondo.appendChild(valorTexto);
    fondo.appendChild(barra);

    barra.style.width = Math.min(valor, 200) + "px";

    document.querySelector(".stats").appendChild(fondo);
}

function cambiarShiny() {
    const imagenPoke = document.querySelector(".imagenPoke");
    const botonShiny = document.querySelector("#cambiarShiny");

    const id = new URLSearchParams(window.location.search);
    const pokemonId = id.get("id");

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const shinyImage = data.sprites.other["official-artwork"].front_shiny;
            const defaultImage = data.sprites.other["official-artwork"].front_default;

            if (imagenPoke.src !== shinyImage) {
                imagenPoke.src = shinyImage;
                botonShiny.innerHTML = "Ver Normal";
            } else {
                imagenPoke.src = defaultImage;
                botonShiny.innerHTML = "Ver Shiny";
            }
        })
}

function quitarHada(nombrePoke, tiposHada) {
    if (tiposHada.includes(nombrePoke)) {
        document.querySelector(".Hada").remove();
    }
}

function traducirGrupoHuevo(nombreGrupo) {
    switch (nombreGrupo) {
        case 'monster':
            return 'Monstruo';
        case 'water1':
            return 'Agua 1';
        case 'bug':
            return 'Bicho';
        case 'flying':
            return 'Volador';
        case 'ground':
            return 'Campo';
        case 'fairy':
            return 'Hada';
        case 'plant':
            return 'Planta';
        case 'humanshape':
            return 'Forma Humana';
        case 'water3':
            return 'Agua 3';
        case 'mineral':
            return 'Mineral';
        case 'amorphous':
            return 'Amorfo';
        case 'water2':
            return 'Agua 2';
        case 'ditto':
            return 'Ditto';
        case 'dragon':
            return 'Dragón';
        case 'undiscovered':
            return 'Desconocido';
        default:
            return nombreGrupo;
    }
}
