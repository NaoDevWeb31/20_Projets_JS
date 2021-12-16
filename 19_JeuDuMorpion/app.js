const info = document.querySelector(".info");
const cellules = document.querySelectorAll(".cell");
const main = document.querySelector("main");

let verrouillage = true,
    joueurEnCours = "X";

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let partieEnCours = ["", "", "", "", "", "", "", "", ""];

cellules.forEach(cell => {
    cell.addEventListener("click", clicSurCase);
});

function clicSurCase(e) {
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute("data-index");

    if (partieEnCours[caseIndex] !== "" || !verrouillage) {
        return;
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    console.log(partieEnCours);

    validationResultats();
}

function validationResultats() {
    let finDePartie = false;

    for (let i = 0; i < alignementsGagnants.length; i++) {
        const alignementGagnant = alignementsGagnants[i];
        // [0, 1, 2]
        let a = partieEnCours[alignementGagnant[0]]; // 0
        let b = partieEnCours[alignementGagnant[1]]; // 1
        let c = partieEnCours[alignementGagnant[2]]; // 2

        if (a === "" || b === "" || c === "") {
            // console.log("continuer");
            continue; // sort de la condition et continuer dans la boucle
        }
        if (a === b && b === c) {
            finDePartie = true;
            // console.log("sortie de la boucle");
            break; // sort complètement de la boucle
        }
    }

    if (finDePartie) {
        main.style.minHeight = "530px";
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`;
        verrouillage = false;
        // console.log("partie finie et sortie de la fonction");
        return; // sort complètement de la fonction
    }

    // si il n'y pas de chaîne de caractères vides dans partie en cours
    let matchNul = !partieEnCours.includes("");
    if (matchNul) {
        info.innerText = `Match nul !`;
        return; // sort complètement de la fonction
    }

    changementDeJoueur();
}

function changementDeJoueur() {
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}
