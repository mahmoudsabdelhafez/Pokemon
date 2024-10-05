async function fetchPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();

        const container = document.getElementById('pokemonContainer');

        for (let pokemon of data.results) {
            const pokemonResponse = await fetch(pokemon.url); 
            const pokemonData = await pokemonResponse.json(); //pokemon data

            // Create a link for each Pokémon
            const pokemonLink = document.createElement('a');
            pokemonLink.href = `pokemon.html?id=${pokemonData.id}`; // Link to the new page with Pokémon ID
            pokemonLink.style.textDecoration = 'none'; // Remove underline from link


            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');

            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemonData.sprites.front_default;

            const pokemonName = document.createElement('p');
            pokemonName.textContent = pokemonData.name;

             // Create and set Pokemon national number (ID)
             const pokemonId = document.createElement('p');
             pokemonId.textContent = `#${pokemonData.id}`;

             // Create and set Pokemon types
             const pokemonTypes = document.createElement('p');
             const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');
             pokemonTypes.textContent = `${types}`;


            
             

             pokemonDiv.appendChild(pokemonImg);
             pokemonDiv.appendChild(pokemonName);   
             pokemonDiv.appendChild(pokemonId);
             pokemonDiv.appendChild(pokemonTypes);
            pokemonLink.appendChild(pokemonDiv); 
             container.appendChild(pokemonLink); 
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

// Function to fetch Pokémon details if on the details page
async function fetchPokemonDetails(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = await response.json();


        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();


        const detailsDiv = document.getElementById('pokemonDetails');

        const img_name = document.createElement('div')

        const img = document.getElementById('img');
        img.src = pokemonData.sprites.front_default;

        const name = document.getElementById('name');
        name.textContent = pokemonData.name;

        const national = document.getElementById('national');
        national.textContent = `National#: ${pokemonData.id}`;

        const type = document.getElementById('type');
        type.textContent = `Types: ${pokemonData.types.map(type => type.type.name).join(', ')}`;

        // const species = document.getElementById('species');
        // species.textContent = `Species: ${speciesData.genera.find(g => g.language.name === 'en').genus}`;

        const height =document.getElementById('height');
        height.textContent = `Height: ${pokemonData.height / 10} m`;

        const weight = document.getElementById('weight');
        weight.textContent = `Weight: ${pokemonData.weight / 10} kg`;

        const abilities = document.getElementById('abilities');
        abilities.textContent = `Abilities: ${pokemonData.abilities.map(a => a.ability.name).join(', ')}`;

       
        const local = document.getElementById('local');
        local.textContent = `Local Number: ${speciesData.pokedex_numbers[0]?.entry_number || 'Unknown'}`;



       
        img_name.appendChild(name);
        img_name.appendChild(img);

        detailsDiv.appendChild(img_name);

        // You can add more details as needed
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
    }
}

// Check if we are on the Pokémon details page
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

if (pokemonId) {
    // If there's a Pokémon ID in the URL, fetch its details
    fetchPokemonDetails(pokemonId);
} else {
    // Otherwise, fetch the list of Pokémon
    fetchPokemon();
}