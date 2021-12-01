const form = document.querySelector(".form-quiz");
let tableauResultats = [];
const reponses = ["c", "a", "b", "a", "c"];
const emojis = ["✅", "✨", "👀", "😭", "👎"];
const titreResultat = document.querySelector(".resultats h2");
const noteResultat = document.querySelector(".note");
const aideResultat = document.querySelector(".aide");
const toutesLesQuestions = document.querySelectorAll(".question-block");
let verifTableau = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    for (let i = 1; i < 6; i++) {
        tableauResultats.push(
            document.querySelector(`input[name="q${i}"]:checked`).value
        );
    }
    // console.log(tableauResultats);
    verifFunc(tableauResultats);
    tableauResultats = [];
});

function verifFunc(tabResultats) {
    for (let a = 0; a < 5; a++) {
        if (tabResultats[a] === reponses[a]) {
            verifTableau.push(true);
        } else {
            verifTableau.push(false);
        }
    }
    // console.log(verifTableau);
    afficherResultats(verifTableau);
    couleursFonction(verifTableau);
    verifTableau = [];
}

function afficherResultats(tabCheck) {
    const nbDeFautes = tabCheck.filter((el) => el !== true).length; // Nombre de false
    // console.log(nbDeFautes);

    switch (nbDeFautes) {
        case 0:
            titreResultat.innerText = `${emojis[0]} Bravo, c'est un sans faute ! ${emojis[0]}`;
            aideResultat.innerText = "";
            noteResultat.innerText = "5/5";
            break;
        case 1:
            titreResultat.innerText = `${emojis[1]} Vous y êtes presque ! ${emojis[1]}`;
            aideResultat.innerText =
                "Retentez une autre réponse dans la case rouge, puis re-validez !";
            noteResultat.innerText = "4/5";
            break;
        case 2:
            titreResultat.innerText = `${emojis[1]} Encore un effort ... ${emojis[2]}`;
            aideResultat.innerText =
                "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "3/5";
            break;
        case 3:
            titreResultat.innerText = `${emojis[2]} Il reste quelques erreurs. ${emojis[3]}`;
            aideResultat.innerText =
                "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "2/5";
            break;
        case 4:
            titreResultat.innerText = `${emojis[3]} Peux mieux faire ! ${emojis[3]}`;
            aideResultat.innerText =
                "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "1/5";
            break;
        case 5:
            titreResultat.innerText = `${emojis[4]} Peux mieux faire ! ${emojis[4]}`;
            aideResultat.innerText =
                "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            noteResultat.innerText = "0/5";
            break;

        default:
            "Wops, cas inattendu.";
            break;
    }
}

function couleursFonction(tabValBool) {
    for (let j = 0; j < tabValBool.length; j++) {
        if (tabValBool[j] === true) {
            toutesLesQuestions[j].style.background = "mediumseagreen";
        } else {
            toutesLesQuestions[j].style.background = "indianred";
            toutesLesQuestions[j].classList.add("echec");

            setTimeout(() => {
                toutesLesQuestions[j].classList.remove("echec");
            }, 500);
        }
    }
}

toutesLesQuestions.forEach((item) => {
    item.addEventListener("click", () => {
        item.style.background = "white";
    });
});
