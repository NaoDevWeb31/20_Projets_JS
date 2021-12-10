const APICALL = "http://api.quotable.io/random";

const tempsAffichage = document.querySelector(".temps");
const scoreAffichage = document.querySelector(".score");

const phraseAEcrire = document.querySelector(".phraseAEcrire");
const phraseTest = document.querySelector(".phrase-test");

let temps = 0;
let score = 0;
let phrasePourScore;
let nbPhrasesEcrites = 0;

tempsAffichage.innerText = `Temps : ${temps}`;
scoreAffichage.innerText = `Score : ${score}`;

let timer = setInterval(time, 1000);

function time() {
    temps--;
    tempsAffichage.innerText = `Temps : ${temps}`;
    scoreAffichage.innerText = `Score : ${score}`;
    if (temps === 0) {
        clearInterval(timer);
        setTimeout(() => {
            alert(
                `Vous avez pu, en 60 secondes, écrire ${nbPhrasesEcrites} phrases complètes contenant au total ${score} caractères !`
            );
            let veutRecommencer = confirm("Souhaitez-vous recommencer ?");
            if (veutRecommencer) {
                location.reload();
            }
        }, 100);
    }
}

// Prendre une phrase de l'API
async function afficherNvPhrase() {
    const appel = await fetch(APICALL);
    const resultats = await appel.json();
    // console.log(resultats);
    const phrase = resultats.content;

    phrasePourScore = phrase.length;

    phraseAEcrire.innerHTML = ``;

    phrase.split("").forEach(carac => {
        const caracSpan = document.createElement("span");
        if (carac === "’") {
            carac = "'";
        }
        caracSpan.innerText = carac;
        phraseAEcrire.appendChild(caracSpan);
    });

    phraseTest.value = null;
}
setTimeout(() => {
    let commencer = confirm(
        "🕹 Bienvenue sur le Speed Typing Game 🕹\nBut du jeu : Tapez les phrases le plus vite possible 🎯\n\nÊtes-vous prêt à commencer le jeu ?"
    );
    if (commencer) {
        temps = 61;
        afficherNvPhrase();
    } else {
        clearInterval(timer);
    }
}, 500);

phraseTest.addEventListener("input", () => {
    const tableauPhrase = phraseAEcrire.querySelectorAll("span"); // contient chaque lettre de la phrase à recopier
    const tableauTest = phraseTest.value.split(""); // contient chaque lettre tapée

    let correct = true;

    tableauPhrase.forEach((caracSpan, index) => {
        const caractere = tableauTest[index]; // lettre tapée

        if (caractere === undefined) {
            caracSpan.classList.remove("correct");
            caracSpan.classList.remove("incorrect");
            correct = false;
        } else if (caractere === caracSpan.innerText) {
            caracSpan.classList.add("correct");
            caracSpan.classList.remove("incorrect");
        } else {
            caracSpan.classList.remove("correct");
            caracSpan.classList.add("incorrect");
            correct = false;
        }
    });

    if (correct && temps > 0) {
        afficherNvPhrase();
        score += phrasePourScore;
        nbPhrasesEcrites++;
    }
});
