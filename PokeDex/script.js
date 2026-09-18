
const pokemonCount = 300; // Controls how many Pokemon are loaded into the Pokedex
var pokeDex = {}; // { 1 : {"name": "pikachu", "ïmg" : url, "type", ["grass", "poision"], "desc" : "...."}}

// Runs this function when the webpage has completely loaded
window.onload = async function() {
   // getPokemon(1); // Calls getPokemon() and requests Pokémon number 1

   // Loops through Pokémon numbers 1 to 1025
    for (let i = 1; i  <= pokemonCount; i++) {
        await getPokemon(i); // Gets the data for the current Pokémon and waits for it to load

        let pokemon = document.createElement("div"); // Creates a new div element for the Pokémon
        pokemon.id = i; // Sets the Pokémon's number as the div's ID
        pokemon.innerText = i.toString() + ". " + pokeDex[i]["name"].toUpperCase() // Displays the Pokémon's number and name in uppercase
        pokemon.classList.add("pokemon-name"); // Adds the pokemon-name CSS class to the div
        pokemon.addEventListener("click", updatePokemon); // Runs updatePokemon when this Pokémon is clicked
        document.getElementById("pokemon-list").append(pokemon); // Adds the Pokémon to the pokemon-list element on the webpage
    }

        // SEARCH FEATURE STARTS HERE

    // Gets the Pokemon search bar
    let searchBar = document.getElementById("pokemon-search");

    // Runs whenever the user types in the search bar
    searchBar.addEventListener("input", function() {

        // Gets what the user has typed
        let searchText = searchBar.value.toLowerCase();

        // Gets all Pokemon from the list
        let pokemonList = document.querySelectorAll(".pokemon-name");

        // Checks every Pokemon
        pokemonList.forEach(function(pokemon) {

            // Gets the Pokemon's name
            let pokemonName = pokeDex[pokemon.id]["name"].toLowerCase();

            // Checks if the Pokemon matches the search
            if (pokemonName.includes(searchText)) {
                pokemon.style.display = "block";
            }
            else {
                pokemon.style.display = "none";
            }
        });
    });

    // Displays Bulbasaur's description when the page first loads
    document.getElementById("pokemon-description").innerText = pokeDex[1]["desc"]; 

    console.log(pokeDex);
}

// Creates a function that gets a Pokémon using its Pokédex number
async function getPokemon(num) {

    // Creates the PokéAPI URL using the Pokémon number
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url); // Sends a request to the PokéAPI and waits for the response
    let pokemon = await res.json();  // Converts the response from JSON into a JavaScript object
    //console.log(pokemon)

   let pokemonName = pokemon["name"]; // Gets the Pokémon's name

   let pokemonType = pokemon["types"]; // Gets the Pokémon's types

   let pokemonImg = pokemon["sprites"]["front_default"]; // Gets the URL for the Pokémon's default front image

   // Gets the Pokémon's stats
    let pokemonStats = pokemon["stats"];

   res = await fetch(pokemon["species"]["url"]); // Gets the Pokémon's species information from the species API

   let pokemonDesc = await res.json(); // Converts the species response into a JavaScript object

   //console.log(pokemonDesc);
   pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"] // Gets the Pokémon description from flavor text entry 9

    // Stores the Pokémon's name, image, types and description in the Pokédex
   pokeDex[num] = {"name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc" : pokemonDesc, "stats": pokemonStats}
}

    function updatePokemon() {

    // Displays the name of the Pokémon that was clicked
    document.getElementById("pokemon-name").innerText =
    pokeDex[this.id]["name"].toUpperCase();
    document.getElementById("pokemon-img").src = pokeDex[this.id]["img"]


        //Clear previous type
        let typesDiv = document.getElementById("pokemon-types");
        while(typesDiv.firstChild) {
            typesDiv.firstChild.remove();
        }

        //update types
        let types = pokeDex[this.id]["types"];
        for (let i = 0; i < types.length; i++) {
            let type = document.createElement("span");
            type.innerText = types[i]["type"]["name"].toUpperCase();
            type.classList.add("type-box");
            type.classList.add(types[i]["type"]["name"]); //adds BG color and font colour
            typesDiv.append(type);
    }

            // Gets the stats section
        let statsDiv = document.getElementById("pokemon-stats");

        // Clears the previous Pokémon's stats
        statsDiv.innerHTML = "";

        // Display Pokemon Stats

        // Gets the selected Pokémon's stats
        let stats = pokeDex[this.id]["stats"];

        // Loops through each stat
        for (let i = 0; i < stats.length; i++) {

            // Creates a paragraph for the stat
            let stat = document.createElement("p");

            // Displays the stat name and value
            stat.innerText =
                stats[i]["stat"]["name"].toUpperCase() +
                ": " +
                stats[i]["base_stat"];

            // Adds the stat to the page
            statsDiv.append(stat);
        }

    //update description
    document.getElementById("pokemon-description").innerText = pokeDex[this.id]["desc"];

}