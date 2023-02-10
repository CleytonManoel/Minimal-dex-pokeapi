//Render informations for pokemon

const pokemonName = document.querySelector(".poke-nick h1");
const pokemonNumber = document.querySelector("#poke-number #number");
const pokemonImage = document.querySelector("#poke-img img");
const pokemonNome = document.querySelector("#pokemon-nick h1");

//Render types for pokemon

const pokemonTypeOne = document.querySelector("#type h2");
const pokemonTypeTwo = document.querySelector("#type #tipos");

//Render stats for pokemon

const pokemonHp = document.querySelector("#hp");
const pokemonAtk = document.querySelector("#atk");
const pokemonDef = document.querySelector("#def");
const pokemonSatk = document.querySelector("#satk");
const pokemonSdef = document.querySelector("#sdef");
const pokemonSpd = document.querySelector("#spd");

//Search forms

const form = document.querySelector("#form");
const input = document.querySelector("#barra-de-busca");
const buttonPrev = document.querySelector('#anterior');
const buttonNext = document.querySelector('#proximo');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Carregando...';
  pokemonNumber.innerHTML = '...';

  const data = await fetchPokemon(pokemon);

  if (data) {

    //Informations for pokemon

    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data['name'];
    pokemonNumber.innerHTML = data['id'];
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonNome.innerHTML = data['name'];

    //Stats for pokemon

    pokemonHp.innerHTML = data['stats']['0']['base_stat'];
    pokemonAtk.innerHTML = data['stats']['1']['base_stat'];
    pokemonDef.innerHTML = data['stats']['2']['base_stat'];
    pokemonSatk.innerHTML = data['stats']['3']['base_stat'];
    pokemonSdef.innerHTML = data['stats']['4']['base_stat'];
    pokemonSpd.innerHTML = data['stats']['5']['base_stat'];

    input.value = '';

    //Types for pokemon

    pokemonTypeOne.innerHTML = data['types']['0']['type']['name'];
    if (data['types']['1']) {
      pokemonTypeTwo.innerHTML = "//" + data['types']['1']['type']['name'];
    }
    else {
      pokemonTypeTwo.innerHTML = "";
    }

    searchPokemon = data.id;
  } 
  else {
    pokemonImage.src = 'imgs/notfound.gif';
    pokemonName.innerHTML = '???';
    pokemonNumber.innerHTML = '???';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});



buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);