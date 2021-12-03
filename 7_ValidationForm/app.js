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
