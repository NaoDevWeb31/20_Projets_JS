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
        nvCouleur.setAttribute("aria-label", `Couleur du dégradé ${index}`);
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor}`;
        containerCouleurs.appendChild(nvCouleur);

        // Ajout dans le tableau de couleurs
        valCouleurs.push(`#${randomColor.toUpperCase()}`);

        // Maj du fond
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        index++;
        if (valCouleurs.length > 2) {
            span.innerText = "";
        }
    } else if (e.target.className === "moins") {
        if (valCouleurs.length === 2) {
            span.innerText = "Il faut au moins deux couleurs !";
            setTimeout(() => {
                span.innerText = "";
            }, 3500);
        } else {
            valCouleurs.pop();
            allInputs[allInputs.length - 1].remove();
            index--;
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        }
    }

    /* MAJ DES INPUTS */
    allInputs.forEach((inp) => {
        inp.addEventListener("input", MAJCOLORS);
    });
}

/* INPUTS DE BASE */
inputsCouleur.forEach((inp) => {
    inp.addEventListener("input", MAJCOLORS);
});

function MAJCOLORS(e) {
    let indexEnCours = e.target.getAttribute("data-index");
    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
}

/* Couleurs aléatoires */
btnRandom.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".inp-couleur");
    for (i = 0; i < valCouleurs.length; i++) {
        valCouleurs[i] = `#${Math.floor(Math.random() * 16777215).toString(
            16
        )}`; // couleur aléatoire en hex
        inputs[i].value = valCouleurs[i].toUpperCase();
        inputs[i].style.background = valCouleurs[i].toUpperCase();
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
    }
});
