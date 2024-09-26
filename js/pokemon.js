const id = new URLSearchParams(window.location.search);
const pokemonId = id.get("id");

getPokemon(pokemonId);

async function getPokemon(pokemonId) {
    try {
        // Cargar los datos del archivo JSON
        const response = await fetch('../pokedex.json');
        const data = await response.json();

        // Encontrar el Pokémon en los datos cargados
        const pokemon = data.find(p => p.num_pokedex === pokemonId);
        const pokemonIdInt = parseInt(pokemonId, 10);

        let pokemonAnterior = null;
        let pokemonSiguiente = null;

        if (pokemonId >= 2 && pokemonId <= 647) {
            pokemonAnterior = pokemonIdInt - 1;
            pokemonSiguiente = pokemonIdInt + 1;
        } else if (pokemonId == 648) {
            pokemonAnterior = pokemonIdInt - 1;
        } else {
            pokemonSiguiente = pokemonIdInt + 1;
        }

        if(pokemonAnterior < 10) {pokemonAnterior = "00" + pokemonAnterior}
        if(pokemonAnterior >= 10 && pokemonAnterior < 100) {pokemonAnterior = "0" + pokemonAnterior}
        if(pokemonSiguiente < 10) {pokemonSiguiente = "00" + pokemonSiguiente}
        if(pokemonSiguiente >= 10 && pokemonSiguiente < 100) {pokemonSiguiente = "0" + pokemonSiguiente}

        pokemonAnterior = data.find(p => p.num_pokedex === String(pokemonAnterior));
        pokemonSiguiente = data.find(p => p.num_pokedex === String(pokemonSiguiente));

        cartaPokemon(pokemon, pokemonAnterior, pokemonSiguiente);

    } catch (error) {
        console.error(error);
    }
}

async function cartaPokemon(pokemon, pokemonAnterior, pokemonSiguiente) {
    const cartaPokemon = document.querySelector(".cartaPokemon");
    const cartaInfo = `
        <div class="container_flex">
        <div class="cartaInfo">
            <h3 style="padding: 0.5rem;">Num. Pokédex: #${pokemon.num_pokedex}</h3>
            <img class="imagenPoke" src="${pokemon.imgs["img_default"]}" alt="imagen ${pokemon.nombre}" width="150" height="150">
            <button id="cambiarShiny" onclick="cambiarShiny()">Ver Shiny</button>
            <div class="infoPoke">
                ${pokemonAnterior ? `<a href="http://wiki-pokemmo.com/pokedex/pokemon.php?id=${pokemonAnterior.num_pokedex}"><img src="${pokemonAnterior.imgs["img_default"]}" alt="${pokemonAnterior.nombre}" width="32" height="32">←</a>` : ''}
                <p><img src="${pokemon.imgs["img_default"]}" alt="${pokemon.nombre}" width="32" height="32">${pokemon.nombre}</p>
                ${pokemonSiguiente ? `<a href="http://wiki-pokemmo.com/pokedex/pokemon.php?id=${pokemonSiguiente.num_pokedex}">→<img src="${pokemonSiguiente.imgs["img_default"]}" alt="${pokemonSiguiente.nombre}" width="32" height="32"></a>` : ''}
            </div>
            <div class="cartaPokeTipos">
                <p class="${pokemon.tipo[0]}">${pokemon.tipo[0]}</p>
                ${pokemon.tipo[1] ? `<p class="${pokemon.tipo[1]}">${pokemon.tipo[1]}</p>` : ""}
            </div>
        </div>
        <div class="cartaPokeGruposHuevo">
            <h3 class="grupoHuevoTitulo">Grupo Huevo</h3>
            <div class="grupoHuevoInnerJs">
                ${pokemon.grupo_huevo[0] ? `<p>${pokemon.grupo_huevo[0]}</p>` : ""}
                ${pokemon.grupo_huevo[1] ? `<p>${pokemon.grupo_huevo[1]}</p>` : ""}
            </div>
        </div>
        <div class="cartaPokeHabilidades">
            ${pokemon.habilidades[0] ? `<p class="PokeHabilidadesCarta">Habilidad: <a href="">${pokemon.habilidades[0]}</a></p>` : ""}
            ${pokemon.habilidades[1] ? `<p class="PokeHabilidadesCarta">Habilidad: <a href="">${pokemon.habilidades[1]}</a></p>` : ""}
            ${pokemon.habilidades[2] ? `<p class="PokeHabilidadesCarta">Habilidad: <a href="">${pokemon.habilidades[2]}</a></p>` : ""}
            ${pokemon.habilidades[3] ? `<p class="PokeHabilidadesCarta">Habilidad: <a href="">${pokemon.habilidades[3]}</a></p>` : ""}
            ${pokemon.habilidades["hab_oculta"] ? `<p class="PokeHabilidadesCarta">Hab. Oculta: <a href="">${pokemon.habilidades["hab_oculta"]}</a></p>` : ""}
            ${pokemon.habilidades["hab_oculta2"] ? `<p class="PokeHabilidadesCarta">Hab. Oculta: <a href="">${pokemon.habilidades["hab_oculta2"]}</a></p>` : ""}
        </div>
        <div class="cartaMedidas">
            <p>Peso: ${pokemon.peso}kg</p>
            <p>Altura: ${pokemon.altura}m</p>
        </div>
        ${pokemon.evoluciones ? `<div class="cartaPokeEvoluciones">
            <h3 style="padding: 0 .75rem; text-decoration: underline;">Evoluciones</h3>
            <div class="datosEvoPoke">
                ${pokemon.evoluciones[0] ? `<div class="evolutionInfo"><p></p><img src="${pokemon.evoluciones[0].img}" alt="${pokemon.evoluciones[0].name}" width="100" height="100"/></div>` : ""}
                ${pokemon.evoluciones[1] ? `<div class="evolutionInfo"><p>${pokemon.evoluciones[1].type + "→" + pokemon.evoluciones[1].valor}</p><img src="${pokemon.evoluciones[1].img}" alt="${pokemon.evoluciones[1].name}"  width="100" height="100"/></div>` : ""}
                ${pokemon.evoluciones[2] ? `<div class="evolutionInfo"><p>${pokemon.evoluciones[2].type + "→" + pokemon.evoluciones[2].valor}</p><img src="${pokemon.evoluciones[2].img}" alt="${pokemon.evoluciones[2].name}"  width="100" height="100"/></div>` : ""}
            </div>
        </div>`: ""}
        <div class="stats"></div>
        <div class="obj_equipados">
            <h3 class="obj_titulo">Objetos Equipados</h3>
            <div class="obj_container">
                ${Object.entries(pokemon.obj_equipado).map(([key, obj]) => `
                    <p style="display: flex; justify-content: center;"><img src="${obj.img}" width="20" height="20"/>${obj.name}</p>
                `).join('') || ''}
            </div>
        </div>
        <div class="obj_equipados">
            <h3 class="obj_titulo">EV'S por Derrotar</h3>
            <div class="obj_container">
                ${Object.entries(pokemon.evs_que_da).map(([key, evs]) => `
                    <p>${evs}</p>
                `).join('') || ''}
            </div>
        </div>
        <div class="obj_equipados">
            <h3 class="obj_titulo">Tier PVP</h3>
            <p style="text-align: center;">${pokemon.tier_pvp}</p>
        </div>
        </div>
        <div class="left-main">
            <h1>${pokemon.nombre}</h1>
            <br>
            <h3>Descripción de la Pokédex</h3>
            <hr>
            <p>"${pokemon.desc_pokemon}"</p>
            <br>
            <p><span style="font-weight: bold;">${pokemon.nombre}</span> es un Pokémon de tipo ${pokemon.tipo[0]} ${pokemon.tipo[1] ? `y como segundo tipo ${pokemon.tipo[1]}` : ""}, ${pokemon.evoluciones ? `es de la rama evolutiva de  ${pokemon.evoluciones[0].name}` : ""}, cada vez que se derrota en un combate puede darte ${pokemon.evs_que_da[0]}${pokemon.evs_que_da[1] ? ` y ${pokemon.evs_que_da[1]}` : ""} en EV's al pokémon con el que lo has derrotado.</p>
            <br>
            <h3>Localización | Donde capturar a ${pokemon.nombre}</h3>
            <hr style="margin-bottom: 1rem;">
            <table class="tabla_sitios">
                <thead>
                    <tr>
                        <td style="font-weight: bold; text-align: center; background-color: #496475;">Tipo</td>
                        <td style="font-weight: bold; text-align: center; background-color: #496475; width: 90px;">Región</td>
                        <td style="font-weight: bold; text-align: center; background-color: #496475; width: 200px;">Sitio</td>
                        <td style="font-weight: bold; text-align: center; background-color: #496475; width: 70px;">Niveles</td>
                        <td style="font-weight: bold; text-align: center; background-color: #496475;">Rareza</td>
                    </tr>
                </thead>
                <tbody id="miTabla">
                    ${Object.entries(pokemon.sitios).map(([key, sitio]) => `
                        <tr>
                            <td>${sitio.tipo}</td>
                            <td style="width: 90px;">${sitio.region}</td>
                            <td style="width: 200px;">${sitio.sitio}</td>
                            <td style="text-align: center; width: 70px;">${sitio.nvl}</td>
                            <td style="text-align: center;">${sitio.rareza}</td>
                        </tr>
                    `).join('') || ''}
                </tbody>
            </table>
            <br>
            <h3>Todos los movimientos que aprende ${pokemon.nombre}</h3>
            <hr style="margin-bottom: 1rem;">
            <br>
        </div>
    `;

    cartaPokemon.innerHTML += cartaInfo;

    crearBarra(pokemon.estadisticas["hp"], "HP");
    crearBarra(pokemon.estadisticas["atq"], "ATQ");
    crearBarra(pokemon.estadisticas["def"], "DEF");
    crearBarra(pokemon.estadisticas["atqesp"], "ATQESP");
    crearBarra(pokemon.estadisticas["defesp"], "DEFESP");
    crearBarra(pokemon.estadisticas["vel"], "VEL");

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
    const h1NombrePoke = document.querySelector("body > div.cartaPokemon > div.left-main > h1");

    const nombrePoke = h1NombrePoke.textContent;

    // Guarda la URL actual de la imagen (original)
    let defaultImage = imagenPoke.dataset.defaultImage || imagenPoke.src;

    // URL de la imagen shiny
    let imagenNormal = new URL(defaultImage);
    imagenNormal.pathname = `/pruebawiki/img/pokedex/${nombrePoke}/${nombrePoke}_shiny.png`;
    let imagenShiny = imagenNormal.toString();

    // Guarda la URL original en un data-attribute si aún no se ha guardado
    if (!imagenPoke.dataset.defaultImage) {
        imagenPoke.dataset.defaultImage = defaultImage;
    }

    // Verifica si la imagen actual es la shiny o no
    if (imagenPoke.src === imagenShiny) {
        // Cambiar a imagen normal
        imagenPoke.src = imagenPoke.dataset.defaultImage;
        botonShiny.innerHTML = "Ver Shiny";
    } else {
        // Cambiar a imagen shiny
        imagenPoke.src = imagenShiny;
        botonShiny.innerHTML = "Ver Normal";
    }
}

function getSitios(sitios) {

}