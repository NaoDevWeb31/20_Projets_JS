const inputsCouleur = document.querySelectorAll(".inp-couleur");
const inputRange = document.querySelector(".inp-range");
const btns = document.querySelectorAll("button");
const fond = document.body;
const containerCouleurs = document.querySelector(".container-couleurs");
const span = document.querySelector("span");
const btnRandom = document.querySelector(".random");

/* Démarrage */
let valCouleurs = ["#BA5370", "#F4E2D8"];
let inclinaison = 45;
let index = 3;
// Assignation de couleurs
inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];
// Assignation du background des inputs
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];
// Assignation du background du body
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;

/* Inclinaison */
inputRange.addEventListener("input", (e) => {
    inclinaison = e.target.value * 3.6; // convertir en degré
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
});

/* Rajout - Suppression */
btns.forEach((btn) => {
    btn.addEventListener("click", rajouteEnleve);
});

function rajouteEnleve(e) {
    const allInputs = document.querySelectorAll(".inp-couleur");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16); // couleur aléatoire en hex
    // console.log(randomColor);

    if (e.target.className === "plus") {
        if (allInputs.length > 8) {
            return;
        }

        const nvCouleur = document.createElement("input");
        nvCouleur.setAttribute("class", "inp-couleur");
        nvCouleur.setAttribute("data-index", index);
        nvCouleur.setAttribute("maxlength", 7);
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor}`;
        containerCouleurs.appendChild(nvCouleur);

        // Ajout dans le tableau de couleurs
        valCouleurs.push(`#${randomColor.toUpperCase()}`);

        // Maj du fond
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        index++;
    }
}
