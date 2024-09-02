// https://pokeapi.co/api/v2/  -> enten: pokemon, encounter-method, berry, move, region, location, osv..

const base = "https://pokeapi.co/api/v2/";

const pokeButton = document.querySelector(".pokemonButton");
const itemButton = document.querySelector(".itemButton");
const berryButton = document.querySelector(".berryButton");

const pokemonKonteirer = document.querySelector(".pokemonKonteirer");
const itemKonteirer = document.querySelector(".itemKonteirer");
const berryKonteirer = document.querySelector(".berryKonteirer");

const buttons = [pokeButton, itemButton, berryButton];
const konteirers = {
  pokemonSide: pokemonKonteirer,
  itemSide: itemKonteirer,
  berrySide: berryKonteirer,
};

let side = "";

function updateDisplay() {
  for (const key in konteirers) {
    if (key.includes(side)) {
      konteirers[key].style.display = "block";
    } else {
      konteirers[key].style.display = "none";
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    side = event.target.dataset.side;
    updateDisplay();
  });
});

// Pokemon input og sånn:

const pokemonDiv = document.querySelector(".pokemon");
const pokeInput = document.querySelector(".pokeInput");
const PokesearchButton = document.querySelector(".PokesearchButton");

pokeInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    PokesearchButton.click();
  }
});

PokesearchButton.addEventListener("click", () => {
  if (pokeInput.value) {
    fetch(`${base}pokemon/${pokeInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        pokemonDiv.innerHTML = `
          <img class="pokemonImg" src="${data.sprites.other.dream_world.front_default}" alt="">
          <h3>${data.name}</h3>
          <p>ID: ${data.id}</p>
          <p>Description:</p>
          <p>Type: ${data.types[0].type.name}</p>
          <p>Height: ${data.height}</p>
          <p>Weight: ${data.weight} lbs</p>
          <p>Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}</p>
          <p></p>
          <p>Stats:</p>
          <p>HP: ${data.stats[0].base_stat}</p>
          <p>Attack: ${data.stats[1].base_stat}</p>
          <p>Defense: ${data.stats[2].base_stat}</p>
          <p>Special Attack: ${data.stats[3].base_stat}</p>

          <p>Where to find:</p>
          
        `;
        fetch(`${base}encounter-method/${data.id}`)
          .then((response) => response.json())
          .then((data2) => {
            console.log(data);
          });
      });
  }
});

//Berries:

const berryDiv = document.querySelector(".berry");
const berryInput = document.querySelector(".berryInput");
const berrysearchButton = document.querySelector(".berrysearchButton");

berryInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    berrysearchButton.click();
  }
});

berrysearchButton.addEventListener("click", () => {
  if (berryInput.value) {
    fetch(`${base}berry`)
      .then((response) => response.json())
      .then((data) => {
        const berry = data.results.find(
          (result) => result.name === berryInput.value
        );
        if (berry) {
          fetch(berry.url)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              berryDiv.innerHTML = `
                <h2>${data.name}</h2>
                <br>
                <p>Description:</p>
                <p>Growth time: ${data.growth_time} hours</p>
                <p>Size: ${data.size}mm</p>
                <p>Smoothness: ${data.smoothness}</p>
                <p>Natural gift type: ${data.natural_gift_type.name}</p>
                <br>
                <p>Flavors:</p>
                <p class="flavor"> ${data.flavors[0].flavor.name} </p>
                <p class="flavor2"> ${data.flavors[1].flavor.name} </p>
                <p class="flavor3"> ${data.flavors[2].flavor.name} </p>
                <p class="flavor4"> ${data.flavors[3].flavor.name} </p>
                <p>Drying out: ${data.soil_dryness}</p>
              `;

              const flavor = document.querySelector(".flavor");
              const flavor2 = document.querySelector(".flavor2");
              const flavor3 = document.querySelector(".flavor3");
              const flavor4 = document.querySelector(".flavor4");
              flavor.classList.add(`${data.flavors[0].flavor.name}`);
              flavor2.classList.add(`${data.flavors[1].flavor.name}`);
              flavor3.classList.add(`${data.flavors[2].flavor.name}`);
              flavor4.classList.add(`${data.flavors[3].flavor.name}`);
            })
            .catch((error) => {
              console.error("Error fetching berry details:", error);
              // Display some error message to the user
            });
        } else {
          console.error("Berry not found.");
          // Display some error message to the user
        }
      })
      .catch((error) => {
        console.error("Error fetching berry list:", error);
        // Display some error message to the user
      });
  }
});

//Items:

const itemDiv = document.querySelector(".item");
const itemInput = document.querySelector(".itemInput");
const itemsearchButton = document.querySelector(".itemsearchButton");

itemInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    itemsearchButton.click();
  }
});

itemsearchButton.addEventListener("click", () => {
  if (itemInput.value) {
    fetch(`${base}item/${itemInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        itemDiv.innerHTML = `
  
        <h2>${data.name}</h2>
        <img class="itemImg" src="${data.sprites.default}" alt="">
            <br>
            <p>Description:</p>
            <p>Category: ${data.category.name}</p>
            <p>Cost: ${data.cost}</p>
            <br>
            <p>Attributes:</p>
            <p> ${data.attributes[0].name}</p>
            <p> ${data.attributes[1].name}</p>
            <p> ${data.attributes[2].name}</p>
            <br>
            <p>Effect:</p>
            <p>  ${data.effect_entries[0].effect}</p>
            <p>  ${data.effect_entries[0].short_effect}</p>
          `;
        // if(data.category.name === "standard-balls"){  }
      });
  }
});
