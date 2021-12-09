let base = document.querySelector(".base");
const premiereCase = document.getElementById("premiere-case");
const boxes = document.querySelectorAll(".case");
const destroy = document.querySelector(".destroy");
const allCases = [];
const choix = [];
let photoEnCours;

for (let i = 0; i < boxes.length; i++) {
    allCases.push(boxes[i]);
}
allCases.push(destroy);

let indexPhoto = 1;

base.style.backgroundImage = `url("https://loremflickr.com/200/300?random=${indexPhoto}")`;
base.setAttribute("data-src", `https://loremflickr.com/200/300?random=${indexPhoto}`);

for (const vide of allCases) {
    // console.log(vide);
    vide.addEventListener("drag", function (e) {}, false);
    vide.addEventListener("dragstart", dragStart, false);
    vide.addEventListener("dragover", dragOver, false);
    vide.addEventListener("dragenter", dragEnter, false);
    vide.addEventListener("drop", dragDrop, false);
}

function nvBase() {
    const newBase = document.createElement("div");
    newBase.setAttribute("class", "base");
    newBase.setAttribute("draggable", "true");
    indexPhoto++;
    newBase.style.backgroundImage = `url(https://loremflickr.com/200/300?random=${indexPhoto})`;
    newBase.setAttribute("data-src", `https://loremflickr.com/200/300?random=${indexPhoto}`);
    photoEnCours = `url(https://loremflickr.com/200/300?random=${indexPhoto})`;
    premiereCase.appendChild(newBase);
    base = newBase;
}

function dragDrop(e) {
    e.preventDefault();
    if (this.id === "premiere-case") {
        return; // empêcher de déposer plusieurs photos sur cette case
    }

    // Destroy
    console.log(this.id === "destroy");
    if (this.id === "destroy") {
        base.remove();
        nvBase();
        return;
    }

    // Verrouillage
    this.removeEventListener("drop", dragDrop);
    this.removeEventListener("dragenter", dragEnter);
    this.removeEventListener("dragover", dragOver);

    base.style.backgroundImage = `url("https://loremflickr.com/200/300?random=${indexPhoto}")`;

    this.appendChild(base);
    this.childNodes[0].setAttribute("draggable", false);
    nvBase();

    choix.push(photoEnCours);
    if (choix.length === 3) {
        premiereCase.querySelector(".base").setAttribute("draggable", false);
        allCases.forEach((oneCase) => {
            oneCase.querySelector(".base").style.cursor = "default";
        });
        for (let index = 1; index < allCases.length - 1; index++) {
            allCases[index].classList.remove("customize-width");
        }

        setTimeout(() => {
            alert("Sélection terminée !");
        }, 200);
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragStart(e) {
    var img = new Image();
    img.src = e.target.dataset.src;
    // console.log(img);
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.setData("text/uri-list", img.src);
}
