const inputDate = document.querySelector("input[type=date]");
const affichage = document.querySelector(".affichage");
const btns = document.querySelectorAll("button");
const inputs = document.querySelectorAll("input");
const infoTxt = document.querySelector(".info-txt");

const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // additionner une semaine en ms
// console.log(nextWeek);
let day = ("" + nextWeek).slice(8, 10);
// console.log(day);
let month = ("" + (nextWeek.getMonth() + 1)).slice(-3);
// console.log(month);
let year = today.getFullYear();
inputDate.value = `${year}-${month}-${day}`;

btns.forEach((btn) => {
    btn.addEventListener("click", btnAction);
});

function btnAction(e) {
    let nvObj = {};

    inputs.forEach((input) => {
        let attrName = input.getAttribute("name");
        let attrValeur =
            attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;
    });
    // console.log(nvObj);

    let description = e.target.getAttribute("data-cookie");

    if (description === "creer") {
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
    } else if (description === "toutAfficher") {
        listeCookies();
    }
}

function creerCookie(name, value, exp) {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
    )};expires=${exp.toUTCString()}`;

    let info = document.createElement("li");
    info.innerText = `Cookie ${name} créé.`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 2000);
}

function listeCookies() {}
