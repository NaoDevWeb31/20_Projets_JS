const container = document.querySelector(".grille");
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;

function creationGrilleEtAliens() {
    let indexAttr = 0;

    for (let i = 0; i < 240; i++) {
        if (indexAttr === 0) {
            const bloc = document.createElement("div");
            bloc.setAttribute("data-left", "true");
            container.appendChild(bloc);
            // console.log(i, bloc);
            indexAttr++;
        } else if (indexAttr === 19) {
            const bloc = document.createElement("div");
            bloc.setAttribute("data-right", "true");
            container.appendChild(bloc);
            // console.log(i, bloc);
            indexAttr = 0;
        } else {
            const bloc = document.createElement("div");
            container.appendChild(bloc);
            // console.log(i, bloc);
            indexAttr++;
        }
    }

    for (let i = 1; i < 53; i++) {
        if (i === 13) {
            i = 21;
            alienInvaders.push(i);
        } else if (i === 33) {
            i = 41;
            alienInvaders.push(i);
        } else {
            alienInvaders.push(i);
        }
    }
    // console.log(alienInvaders);

    toutesLesDivs = document.querySelectorAll(".grille div");
    alienInvaders.forEach((invader) => {
        toutesLesDivs[invader].classList.add("alien");
    });

    toutesLesDivs[tireurPosition].classList.add("tireur");
}
creationGrilleEtAliens();
