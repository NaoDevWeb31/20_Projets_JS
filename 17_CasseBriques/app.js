const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const rayonBalle = 10,
    barreHeight = 10,
    barreWidth = 75;

let x = canvas.width / 2,
    y = canvas.height - 30,
    barreX = (canvas.width - barreWidth) / 2;

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
