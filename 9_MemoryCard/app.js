const cartes = document.querySelectorAll(".carte");

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;

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
}
