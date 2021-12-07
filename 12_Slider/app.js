const imgs = document.querySelectorAll(".cont-slides img");
const suivant = document.querySelector(".right");
const precedent = document.querySelector(".left");
const cercles = document.querySelectorAll(".cercle");

let index = 0;

suivant.addEventListener("click", slideSuivante);

function slideSuivante() {
    if (index < 2) {
        imgs[index].classList.remove("active");
        index++;
        imgs[index].classList.add("active");
    } else if (index === 2) {
        imgs[index].classList.remove("active");
        index = 0;
        imgs[index].classList.add("active");
    }
    for (let i = 0; i < cercles.length; i++) {
        if (cercles[i].getAttribute("data-clic") - 1 === index) {
            cercles[i].classList.add("active-cercle"); // cercle actif => violet
        } else {
            cercles[i].classList.remove("active-cercle"); // cercle inactif => blanc
        }
    }
}

precedent.addEventListener("click", slidePrecedente);

function slidePrecedente() {
    if (index > 0) {
        imgs[index].classList.remove("active");
        index--;
        imgs[index].classList.add("active");
    } else if (index === 0) {
        imgs[index].classList.remove("active");
        index = 2;
        imgs[index].classList.add("active");
    }
    for (let i = 0; i < cercles.length; i++) {
        if (cercles[i].getAttribute("data-clic") - 1 === index) {
            cercles[i].classList.add("active-cercle"); // cercle actif => violet
        } else {
            cercles[i].classList.remove("active-cercle"); // cercle inactif => blanc
        }
    }
}

document.addEventListener("keydown", keyPressed);

function keyPressed(e) {
    if (e.keyCode === 37) {
        slidePrecedente();
    } else if (e.keyCode === 39) {
        slideSuivante();
    }
}

// Cercles

cercles.forEach((cercle) => {
    cercle.addEventListener("click", function () {
        for (let i = 0; i < cercles.length; i++) {
            cercles[i].classList.remove("active-cercle"); // cercles inactifs => blancs
        }
        this.classList.add("active-cercle"); // this => cercle cliqué violet

        imgs[index].classList.remove("active"); // Image précédemment active
        index = this.getAttribute("data-clic") - 1;
        imgs[index].classList.add("active"); // Image présentement active
    });
});
