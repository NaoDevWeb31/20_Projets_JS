const APICALL = "http://api.quotable.io/random";

const tempsAffichage = document.querySelector(".temps");
const scoreAffichage = document.querySelector(".score");

const phraseAEcrire = document.querySelector(".phraseAEcrire");
const phraseTest = document.querySelector(".phrase-test");

let temps = 60;
let score = 0;

tempsAffichage.innerText = `Temps : ${temps}`;
scoreAffichage.innerText = `Score : ${score}`;

let timer = setInterval(time, 1000);

function time() {
    temps--;
    tempsAffichage.innerText = `Temps : ${temps}`;
    scoreAffichage.innerText = `Score : ${score}`;
    if (temps === 0) {
        clearInterval(timer);
    }
}

// Prendre une phrase de l'API
async function afficherNvPhrase() {
    const appel = await fetch(APICALL);
    const resultats = await appel.json();
    // console.log(resultats);
    const phrase = resultats.content;

    phraseAEcrire.innerHTML = ``;

    phrase.split("").forEach(carac => {
        const caracSpan = document.createElement("span");
        caracSpan.innerText = carac;
        phraseAEcrire.appendChild(caracSpan);
    });

    phraseTest.value = null;
}
afficherNvPhrase();
