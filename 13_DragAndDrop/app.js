let base = document.querySelector(".base");
const premiereCase = document.getElementById("premiere-case");
const boxes = document.querySelectorAll(".case");
const destroy = document.querySelector(".destroy");
const allCases = [];

for (let i = 0; i < boxes.length; i++) {
    allCases.push(boxes[i]);
}
// console.log(allCases);

let indexPhoto = 1;

base.style.backgroundImage = `url(https://loremflickr.com/200/300?random=${indexPhoto})`;

for (const vide of allCases) {
    // console.log(vide);
    vide.addEventListener("dragover", dragOver);
    vide.addEventListener("dragenter", dragEnter);
    vide.addEventListener("drop", dragDrop);
}

function dragDrop() {
    this.appendChild(base);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}
