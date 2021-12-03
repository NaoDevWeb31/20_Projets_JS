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
            <li class="followers">Followers : ${user.followers}</li>
            <li class="etoiles">Repos : ${user.public_repos}</li>
            <li class="bio">Followers : ${user.bio}</li>
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
