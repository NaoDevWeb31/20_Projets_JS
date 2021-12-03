const inpUtilisateur = document.querySelector(
    ".form-groupe:nth-child(1) input"
);
const inpMail = document.querySelector(".form-groupe:nth-child(2) input");
const inpMdp = document.querySelector(".form-groupe:nth-child(3) input");
const inpConfirme = document.querySelector(".form-groupe:nth-child(4) input");

const allImg = document.querySelectorAll(".icone-verif");
const allSpan = document.querySelectorAll("span");
const allLigne = document.querySelectorAll(".ligne div");

inpUtilisateur.addEventListener("input", (e) => {
    if (e.target.value.length >= 3) {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    } else {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";
    }
});

inpMail.addEventListener("input", (e) => {
    const regexEmail =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{3}(?:\.[a-z]{2})?)$/i;

    if (e.target.value.search(regexEmail) === 0) {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/check.svg";
        allSpan[1].style.display = "none";
    } else if (e.target.value.search(regexEmail) === -1) {
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";
    }
});

// Validation création du MDP

let valeurInp;
const specialCar = /[^a-zA-Z0-9]/;
const alphabet = /[a-z]/i;
const chiffres = /[0-9]/;

let objValidation = {
    symbole: 0,
    lettre: 0,
    chiffre: 0,
};

inpMdp.addEventListener("input", (e) => {
    valeurInp = e.target.value;

    // vérification RegEx et présence de symbole, lettre et chiffre
    if (valeurInp.search(specialCar) !== -1) {
        objValidation.symbole = 1;
    }
    if (valeurInp.search(alphabet) !== -1) {
        objValidation.lettre = 1;
    }
    if (valeurInp.search(chiffres) !== -1) {
        objValidation.chiffre = 1;
    }

    // prise en compte de l'effacement de symbole, lettre et chiffre
    if ((e.inputType = "deleteContentBackward")) {
        if (valeurInp.search(specialCar) === -1) {
            objValidation.symbole = 0;
        }
        if (valeurInp.search(alphabet) === -1) {
            objValidation.lettre = 0;
        }
        if (valeurInp.search(chiffres) === -1) {
            objValidation.chiffre = 0;
        }
    }
    // console.log(objValidation);

    // Respect de la consigne indiquant la présence d'au moins un symbole, une lettre et un chiffre
    let testAll = 0;
    for (const property in objValidation) {
        if (objValidation[property] > 0) {
            testAll++;
        }
    }
    if (testAll < 3) {
        allSpan[2].style.display = "inline";
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.svg";
    } else {
        allSpan[2].style.display = "none";
        allImg[2].src = "ressources/check.svg";
    }

    // force mdp
    if (valeurInp.length > 0 && valeurInp.length <= 6) {
        allLigne[0].style.display = "block";
        allLigne[1].style.display = "none";
        allLigne[2].style.display = "none";
    } else if (valeurInp.length > 6 && valeurInp.length <= 9) {
        allLigne[0].style.display = "block";
        allLigne[1].style.display = "block";
        allLigne[2].style.display = "none";
    } else if (valeurInp.length > 9) {
        allLigne[0].style.display = "block";
        allLigne[1].style.display = "block";
        allLigne[2].style.display = "block";
    } else if (valeurInp.length === 0) {
        allLigne[0].style.display = "none";
        allLigne[1].style.display = "none";
        allLigne[2].style.display = "none";
    }
});
