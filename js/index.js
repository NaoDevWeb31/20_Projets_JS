const projectsList = document.querySelector("ul");

let projects = [
    ["1_Quiz", "Le Quiz"],
    ["2_AppMeteo", "L'Application Météo sur navigateur"],
    ["3_Pokedex", "Le Pokédex"],
    ["4_Cookies", "Le Créateur de cookies"],
    ["5_ToDoJS", "La To-Do Liste"],
    ["6_Pomodoro", "L'App Pomodoro"],
    ["7_ValidationForm", "La Validation de Formulaire"],
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
