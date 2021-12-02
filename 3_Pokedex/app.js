const searchInput = document.querySelector(".recherche-poke input");

// Animation Input

searchInput.addEventListener("input", (e) => {
    if (e.target.value !== "") {
        e.target.parentNode.classList.add("active-input");
    } else {
        e.target.parentNode.classList.remove("active-input");
    }
});
