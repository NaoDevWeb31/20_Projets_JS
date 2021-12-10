const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const affichageScore = document.querySelector(".score");

const rayonBalle = 10,
    barreHeight = 10,
    barreWidth = 75,
    nbCol = 8,
    nbRow = 5,
    largeurBrique = 75,
    hauteurBrique = 20;

let x = canvas.width / 2,
    y = canvas.height - 30,
    barreX = (canvas.width - barreWidth) / 2,
    fin = false,
    vitesseX = 5,
    vitesseY = -5;

function dessineBalle() {
    ctx.beginPath();
    ctx.arc(x, y, rayonBalle, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}
dessineBalle();

function dessineBarre() {
    ctx.beginPath();
    ctx.rect(barreX, canvas.height - barreHeight - 2, barreWidth, barreHeight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}
dessineBarre();

// Tableau avec toutes les briques
const briques = [];
for (let i = 0; i < nbRow; i++) {
    briques[i] = [];

    for (let j = 0; j < nbCol; j++) {
        briques[i][j] = { x: 0, y: 0, statut: 1 };
    }
}
// console.log(briques);

function dessineBriques() {
    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
            if (briques[i][j].statut === 1) {
                let briqueX = j * (largeurBrique + 10) + 35;
                let briqueY = i * (hauteurBrique + 10) + 30;

                briques[i][j].x = briqueX;
                briques[i][j].y = briqueY;

                ctx.beginPath();
                ctx.rect(briqueX, briqueY, largeurBrique, hauteurBrique);
                ctx.fillStyle = "#333";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// dessineBriques();

function dessine() {
    if (fin === false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessineBriques();
        dessineBalle();
        dessineBarre();

        if (
            x + vitesseX > canvas.width - rayonBalle ||
            x + vitesseX < rayonBalle
        ) {
            vitesseX = -vitesseX;
        }

        if (y + vitesseY < rayonBalle) {
            vitesseY = -vitesseY;
        }

        if (y + vitesseY > canvas.height - rayonBalle) {
            // un intervalle => 0 - 75
            if (x > barreX && x < barreX + barreX) {
                vitesseX = vitesseX + 0.1;
                vitesseY = vitesseY + 0.1;
                vitesseY = -vitesseY;
            } else {
                fin = true;
                affichageScore.innerHTML = `<span style="color: red;">🪦 PERDU 🪦</span> <br> Clique sur le casse-briques pour recommencer 🕹`;
            }
        }

        x += vitesseX;
        y += vitesseY;
        requestAnimationFrame(dessine);
    }
}
dessine();

// Recommencer
canvas.addEventListener("click", () => {
    if (fin === true) {
        fin = false;
        document.location.reload();
    }
});
