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
// Assignation de couleurs
inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];
// Assignation du background des inputs
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];
// Assignation du background du body
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
