const APICALL = "https://api.github.com/users/";
const affichage = document.querySelector(".affichage");
const form = document.querySelector(".form-github-recherche");
const inpRecherche = document.querySelector(".inp-recherche");

async function dataGithub(utilisateur) {
    const reponse = await fetch(`${APICALL}${utilisateur}`);
    const data = await reponse.json();

    // console.log(data);

    creationCarte(data);
}

dataGithub("NaoDevWeb31");

function creationCarte(user) {
    const carteHTML = `
    <div class="carte">
        <img src="${user.avatar_url}" alt="icône avatar" class="avatar">
        <h2>${user.name}</h2>
        <ul class="cont-infos">
            <li class="followers"><span class="infos-label">Followers:</span> ${user.followers}</li>
            <li class="etoiles"><span class="infos-label">Repos:</span> ${user.public_repos}</li>
            <li class="bio"><div class="infos-label">Bio:</div> <div>${user.bio}</div></li>
        </ul>
    </div>
    `;
    affichage.innerHTML = carteHTML;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inpRecherche.value.length > 0) {
        dataGithub(inpRecherche.value);
        inpRecherche.value = "";
    }
});
