const cartes = document.querySelectorAll(".carte");

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;

let cartesVisibles = [];
let veutRejouer;

cartes.forEach((carte) => {
    carte.addEventListener("click", retourneCarte);
});

function retourneCarte() {
    // console.log(this);
    // console.log(this.childNodes);

    if (verouillage) return;

    this.childNodes[1].classList.toggle("active"); // div.double-face.active => retourner la carte

    if (!carteRetournee) {
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    // console.log(premiereCarte, secondeCarte);

    correspondance();
    recommencerJeu();
}

function correspondance() {
    if (
        premiereCarte.getAttribute("data-attr") ===
        secondeCarte.getAttribute("data-attr")
    ) {
        // Cartes correspondantes restent visibles
        premiereCarte.removeEventListener("click", retourneCarte);
        secondeCarte.removeEventListener("click", retourneCarte);
        cartesVisibles.push(premiereCarte, secondeCarte);
    } else {
        verouillage = true; // impossible de retourner d'autres cartes que les 2 visibles
        setTimeout(() => {
            premiereCarte.childNodes[1].classList.remove("active");
            secondeCarte.childNodes[1].classList.remove("active");

            verouillage = false;
        }, 1500);
    }
}

function aleatoire() {
    cartes.forEach((carte) => {
        let positionAlea = Math.floor(Math.random() * 12);
        carte.style.order = positionAlea;
    });
}
aleatoire();

function recommencerJeu() {
    if (cartesVisibles.length === 12) {
        setTimeout(() => {
            veutRejouer = confirm(
                "✅ Victoire ✅\nSouhaitez-vous refaire une autre partie ?"
            );
            if (veutRejouer) {
                location.reload();
            } else {
                return;
            }
        }, 800);
    }
}
