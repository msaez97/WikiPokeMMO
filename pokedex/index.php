<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="google-adsense-account" content="ca-pub-4911360042357338">
	<meta name="description" content="Mira la pokedex de la Wiki de PokeMMO no oficial, encuentra cualquier pokemon, totalmente en español.">
    <title>Wiki | Pokedex | PokeMMO | Español | No Oficial</title>
	<link rel="icon" href="../img/favicon.ico" type="image/x-icon">
	<link rel="apple-touch-icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/nav.css">
    <link rel="preload" href="../js/script.js" as="script" />
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-GW3K77TW0W"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'G-GW3K77TW0W');
	</script>
</head>
<body>
	<?php require '../assets/header.php'; ?>
	<main class="contenedor">
		<h1 class="h1-style">Pokedex Wiki PokeMMO No Oficial en Español</h1>
		<p class="padding-no-bottom">¡Bienvenid@ a la pokedex de la wiki no oficial en español de PokeMMO! Aquí encontrarás una valiosa fuente de información sobre cada Pokémon de este multijugador en línea.</p>
		<div class="buscador">
			<input oninput="mostrarSugerencias()" class="input-buscador" type="text" placeholder="Buscar pokemon por nombre..">
			<div class="sugerencias" id="sugerenciasContainer"></div>
			<button onclick="buscarPokemon()">Buscar</button>
		</div>
		<div class="contenedor-mostrar-todo">
			<button class="padding-all upper negro mostrartodo" onclick="location.reload()">Mostrar Todo</button>
		</div>
		<button onclick="mostrarFiltros()" class="btn-filtros">Filtros</button>
		<div class="tiposfiltro" id="filtroDiv">
			<button class="padding-all upper negro Planta" onclick="buscarTipo('grass')">Planta</button>
			<button class="padding-all upper negro Fuego" onclick="buscarTipo('fire')">Fuego</button>
			<button class="padding-all upper negro Veneno" onclick="buscarTipo('poison')">Veneno</button>
			<button class="padding-all upper negro Volador" onclick="buscarTipo('flying')">Volador</button>
			<button class="padding-all upper negro Agua" onclick="buscarTipo('water')">Agua</button>
			<button class="padding-all upper negro Bicho" onclick="buscarTipo('bug')">Bicho</button>
			<button class="padding-all upper negro Normal" onclick="buscarTipo('normal')">Normal</button>
			<button class="padding-all upper negro Eléctrico" onclick="buscarTipo('electric')">Eléctrico</button>
			<button class="padding-all upper negro Tierra" onclick="buscarTipo('ground')">Tierra</button>
			<button class="padding-all upper Lucha" onclick="buscarTipo('fighting')">Lucha</button>
			<button class="padding-all upper negro Psíquico" onclick="buscarTipo('psychic')">Psíquico</button>
			<button class="padding-all upper negro Roca" onclick="buscarTipo('rock')">Roca</button>
			<button class="padding-all upper negro Acero" onclick="buscarTipo('steel')">Acero</button>
			<button class="padding-all upper negro Hielo" onclick="buscarTipo('ice')">Hielo</button>
			<button class="padding-all upper Fantasma" onclick="buscarTipo('ghost')">Fantasma</button>
			<button class="padding-all upper negro Dragón" onclick="buscarTipo('dragon')">Dragón</button>
			<button class="padding-all upper Siniestro" onclick="buscarTipo('dark')">Siniestro</button>
		</div>
		<div id="pokemonList"></div>
		<div id="loadingIndicator">Cargando...</div>
		<h2 class="h1-style">Herramienta esencial para todo entrenador pokemon</h2>
		<p class="padding-no-bottom">La sección de la Pokédex en nuestra wiki no oficial de PokeMMO es una herramienta esencial para los entrenadores que buscan información detallada sobre todas las especies de Pokémon disponibles en el juego. Aquí, encontrarás entradas completas que incluyen datos clave, como estadísticas base, movimientos aprendidos, ubicaciones de captura y evoluciones.</p>
		<h2 class="h1-style">Información sobre todos los pokemon de PokeMMO en Español</h2>
		<p class="padding-no-bottom">Cada página de la Pokédex está diseñada de manera intuitiva, permitiendo una fácil navegación para que los usuarios encuentren rápidamente la información que están buscando. Las imágenes vibrantes y las descripciones detalladas brindan una visión completa de la apariencia y características de cada Pokémon, mientras que las secciones interactivas facilitan la búsqueda de datos específicos.</p>
		<h2 class="h1-style">¡Estrategias de pokemon en nuestra wiki de PokeMMO!</h2>
		<p class="padding-no-bottom">Además de la información básica de la Pokédex, nuestra wiki también destaca estrategias recomendadas para entrenadores que buscan maximizar el potencial de sus Pokémon en combate. Desde sugerencias de movimientos hasta tácticas de equipo, nuestra Pokédex no oficial es una guía completa que acompaña a los jugadores en su viaje para convertirse en los mejores entrenadores de PokeMMO. ¡Explora las páginas de la Pokédex y descubre el conocimiento necesario para construir un equipo imparable!</p>
		<h2 class="h1-style">Busqueda y filtros de pokemon avanzados</h2>
		<p class="padding-no-bottom">Hemos implementado una función de búsqueda avanzada que permite a los entrenadores encontrar Pokémon según criterios específicos, como tipo, hábitat o incluso la región de origen. Esta herramienta facilita la planificación estratégica para la captura y entrenamiento de Pokémon, ofreciendo a los jugadores la capacidad de tomar decisiones informadas sobre la construcción de su equipo.</p>
		<h2 class="h1-style">Comparte tus equipos de PVP y PVE a otros usuarios</h2>
		<p class="padding-no-bottom">Dentro de nuestra wiki no oficial de PokeMMO, la sección de la Pokédex va más allá de ser simplemente una enciclopedia digital; es un portal interactivo que conecta a los entrenadores de diversas partes del mundo. Los perfiles de usuario permiten a los jugadores compartir sus equipos, estrategias y logros personales, creando una red social única dentro de la comunidad de PokeMMO.</p>
		<h2 class="h1-style">Estadisticas actualizadas en todo momento</h2>
		<p class="padding-no-bottom">La sección de la Pokédex también se mantiene al día con las actualizaciones del juego, proporcionando información detallada sobre nuevas incorporaciones de Pokémon, cambios en las estadísticas y eventos temporales. Esto asegura que los entrenadores estén siempre informados y preparados para enfrentar los desafíos más recientes en el mundo en constante evolución de PokeMMO.</p>
		<h2 class="h1-style">Comunidad de entrenadores pokemon de PokeMMO en Español</h2>
		<p class="padding-no-bottom">En última instancia, la Pokédex en nuestra wiki no oficial es una herramienta dinámica que evoluciona junto con la comunidad de entrenadores. Estamos comprometidos a ofrecer una experiencia integral que no solo informa, sino que también conecta y celebra la diversidad de estilos de juego y logros dentro de la emocionante aventura de PokeMMO. ¡Explora, participa y comparte tus historias en nuestra comunidad dedicada a Pokémon!</p>
		<p class="padding-no-bottom">En resumen, la sección de la Pokédex en nuestra wiki no oficial de PokeMMO es mucho más que una simple enciclopedia; es una herramienta interactiva y en constante evolución que enriquecerá tu experiencia como entrenador en este emocionante mundo virtual. ¡Explora, descubre y sumérgete en el fascinante universo de los Pokémon en PokeMMO!</p>
		<p class="padding-no-bottom">Puedes visitar la página oficial del juego desde <a class="negro underline" href="https://pokemmo.com/es/" target="_blank">Página PokeMMO</a>.</p>
		<br>
	</main>
    <script src="../js/script.js"></script>
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4911360042357338" crossorigin="anonymous"></script>
	<script src="../js/nav.js"></script>
</body>
</html>