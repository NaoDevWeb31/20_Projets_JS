const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particuleTab;

class Particule {
    constructor(x, y, directionX, directionY, taille, couleur) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }
    dessine() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false);
        ctx.fillStyle = this.couleur;
        ctx.fill();
    }
}
// const obj1 = new Particule(300, 300, 50, 50, 100, "black");
// console.log(obj1);
// obj1.dessine();

function init() {
    particuleTab = [];
    for (let i = 0; i < 100; i++) {
        let taille = (Math.random() + 0.01) * 20;
        let x = Math.random() * (window.innerWidth - taille * 2);
        let y = Math.random() * (window.innerHeight - taille * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = "white";
        particuleTab.push(
            new Particule(x, y, directionX, directionX, taille, couleur)
        );
    }
}
init();
console.log(particuleTab);