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
    vitesseX = 3,
    vitesseY = -3,
    score = 0;


function dessineBalle() {
    ctx.beginPath();
    ctx.arc(x, y, rayonBalle, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}
// dessineBalle();

function dessineBarre() {
    ctx.beginPath();
    ctx.rect(barreX, canvas.height - barreHeight - 2, barreWidth, barreHeight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}
// dessineBarre();


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
        collisionDetection();

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
            if (x > barreX && x < barreX + barreWidth) {
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


// Collision de la balle contre les briques
function collisionDetection() {
    for (let i = 0; i < nbRow; i++) {
        for (let j = 0; j < nbCol; j++) {
            let b = briques[i][j];
            if (b.statut === 1) {
                if (
                    x > b.x &&
                    x < b.x + largeurBrique &&
                    y > b.y &&
                    y < b.y + hauteurBrique
                ) {
                    vitesseY = -vitesseY;
                    b.statut = 0;

                    score++;
                    affichageScore.innerHTML = `Score : ${score}`;

                    if (score === nbCol * nbRow) {
                        affichageScore.innerHTML = `<span style="color: mediumspringgreen;">🎉 Bravo 🎉</span> <br> Clique sur le casse-briques pour recommencer 🕹`;
                        fin = true;
                    }
                }
            }
        }
    }
}


// Mouvement de la barre
document.addEventListener("mousemove", mouvementSouris);
function mouvementSouris(e) {
    let posXBarreCanvas = e.clientX - canvas.offsetLeft;
    // e.clienX => de la gauche jusqu'à la souris
    // canvas.offsetLeft => décalage par rapport à la gauche

    // console.log(posXBarreCanvas);

    if (posXBarreCanvas > 35 && posXBarreCanvas < canvas.width - 35) {
        barreX = posXBarreCanvas - barreWidth / 2;
    }
}


// Recommencer le jeu
canvas.addEventListener("click", () => {
    if (fin === true) {
        fin = false;
        document.location.reload();
    }
});


// Configurer les événements tactiles pour mobile, etc
canvas.addEventListener("touchstart", e => {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX
        });
        canvas.dispatchEvent(mouseEvent);
    },
    false
);

canvas.addEventListener("touchend", e => {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    },
    false
);

canvas.addEventListener("touchcancel", e => {
        e.preventDefault();
        var touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            ongoingTouches.splice(i, 1); // On enlève le point
        }
    },
    false
);

canvas.addEventListener("touchmove", e => {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
        });
        canvas.dispatchEvent(mouseEvent);

        let posXBarreCanvas = touch.clientX - canvas.offsetLeft;

        if (posXBarreCanvas > 35 && posXBarreCanvas < canvas.width - 35) {
            barreX = posXBarreCanvas - barreWidth / 2;
        }
    },
    false
);

// Récupérer la position du toucher relatif au canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    // console.log(rect);

    return {
        x: touchEvent.touches[0].clientX - rect.left,
    };
}