const searchInput = document.querySelector(".recherche-poke input");

function fetchPokemonBase() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((reponse) => reponse.json())
        .then((allPoke) => {
            console.log(allPoke);
        });
}
fetchPokemonBase();

// Animation Input

searchInput.addEventListener("input", (e) => {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add("active-input");
    } else {
        e.target.parentNode.classList.remove("active-input");
    }
});
