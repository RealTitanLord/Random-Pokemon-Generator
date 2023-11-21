const randomButton = document.getElementById('randomButton');
const pokemonContainer = document.querySelector('.pokemon-container');

randomButton.addEventListener('click', getRandomPokemon);

function getRandomPokemon() {
  const randomPokemonId = Math.floor(Math.random() * 898) + 1;

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
    .then(response => response.json())
    .then(data => displayPokemon(data))
    .catch(error => console.error('Error fetching Pokémon:', error));
}

function displayPokemon(pokemon) {
  const types = pokemon.types.map(type => type.type.name);
  const typeColors = getBackgroundColor(types);

  pokemonContainer.innerHTML = `
    <h2 style="background-color: ${typeColors[0]}; font-weight: bold;">${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>Type(s): ${types.join(', ')}</p>
    <p>Height: ${pokemon.height} dm</p>
    <p>Weight: ${pokemon.weight} hg</p>
    <p>Region Found: ${getRegion(pokemon.location_area_encounters)}</p>
    <!-- Add more details as needed -->
  `;
}

function getRegion(locationUrl) {
  const regionMatch = locationUrl.match(/generation-(\d+)\//);
  if (regionMatch) {
    const generationNumber = parseInt(regionMatch[1], 10);
    return `Generation ${generationNumber}`;
  }
  return 'Unknown Region';
}

function getBackgroundColor(types) {
  const typeColorMap = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  const typeColors = types.map(type => typeColorMap[type] || '#B0B0B0');
  return typeColors;
}
