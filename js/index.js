const projectsList = document.querySelector("ul");

let projects = [
    ["1_Quiz", "Le Quiz"],
    ["2_AppMeteo", "L'Application Météo sur navigateur"],
    ["3_Pokedex", "Le Pokédex"],
    ["4_Cookies", "Le Créateur de cookies"],
    ["5_ToDoJS", "La To-Do Liste"],
    ["6_Pomodoro", "L'Application Pomodoro"],
    ["7_ValidationForm", "La Validation de Formulaire"],
    ["8_CouleursJS", "L'Application de Création de dégradés linéaires"],
    ["9_MemoryCard", "Le Jeu des Cartes mémoires"],
    ["10_GithubAPI", "La Recherche d'utilisateur GitHub"],
    ["11_Authentification", "Le Système d'Authentification"],
    ["12_Slider", "Le Slider"],
    ["13_DragAndDrop", "L'Application de Drag & Drop"],
    ["14_ParticulesJS", "L'Application de création de Particules en JS"],
    ["15_Space Invaders", 'Le Jeu "Space-Invaders"'],
    ["16_CustomLecteurVideo", "Le Lecteur vidéo"],
];

for (let index = 0; index < projects.length; index++) {
    let item = `<li class="list-group-item list-group-item-action bg-transparent border-0 my-2 py-1">
                    <span class="fa-li">
                        <i class="fab fa-js-square fa-lg"></i>
                    </span>
                    <a href="${projects[index][0]}/index.html" class="text-dark">
                        ${projects[index][1]}
                    </a>
                </li>`;
    projectsList.innerHTML += item;
}
