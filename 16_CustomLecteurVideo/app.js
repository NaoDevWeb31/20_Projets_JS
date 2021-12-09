const video = document.querySelector("video");
const btnPlayPause = document.getElementById("play-pause");
const img = document.querySelector("#play-pause img");
const barreOrange = document.querySelector(".barre-orange");
const progression = document.querySelector(".juice");
const btnMute = document.getElementById("mute");
const imgMute = document.querySelector("#mute img");
const btnPleinEcran = document.getElementById("fullscreen");
const curseurVol = document.getElementById("volume-slider");

btnPlayPause.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);

function togglePlayPause() {
    if (video.paused) {
        img.src = "ressources/pause.svg";
        img.setAttribute("alt", "Icône de pause");
        video.play();
    } else {
        img.src = "ressources/play.svg";
        img.setAttribute("alt", "Icône de lecture");
        video.pause();
    }
}

// La barre orange
video.addEventListener("timeupdate", () => {
    let progressionPos = video.currentTime / video.duration;

    progression.style.width = progressionPos * 100 + "%";

    if (video.ended) {
        img.src = "ressources/play.svg";
        img.setAttribute("alt", "Icône de lecture");
    }
});

// Volume
curseurVol.addEventListener("change", () => {
    video.volume = curseurVol.value / 100;
    // console.log(video.volume);

    if (video.volume === 0) {
        // console.log("curseurVol.add + video.volume === 0");
        video.muted = true;
        imgMute.src = "ressources/mute.svg";
        imgMute.setAttribute("alt", "Icône du son désactivé");
        curseurVol.value = 0;
    } else {
        // console.log("curseurVol.add + video.volume !== 0 ");
        video.muted = false;
        if (video.volume < 0.3) {
            imgMute.src = "ressources/volume-small.svg";
        } else if (video.volume < 0.7) {
            imgMute.src = "ressources/medium-volume.svg";
        } else {
            imgMute.src = "ressources/unmute.svg";
        }
        imgMute.setAttribute("alt", "Icône du son activé");
        video.volume = curseurVol.value / 100;
    }
});

// Mute
let valeurCurseur;
btnMute.addEventListener("click", () => {
    if (video.muted) {
        // console.log("btnMute.add + video vol activé");
        video.muted = false;
        if (video.volume < 0.3) {
            imgMute.src = "ressources/volume-small.svg";
        } else if (video.volume < 0.7) {
            imgMute.src = "ressources/medium-volume.svg";
        } else {
            imgMute.src = "ressources/unmute.svg";
        }
        imgMute.setAttribute("alt", "Icône du son activé");
        curseurVol.value = valeurCurseur;
        video.volume = curseurVol.value / 100;
    } else {
        valeurCurseur = curseurVol.value;
        // console.log("btnMute.add + video.muted");
        video.muted = true;
        imgMute.src = "ressources/mute.svg";
        imgMute.setAttribute("alt", "Icône du son désactivé");
        curseurVol.value = video.volume = 0;
    }
});

// Clic sur la barre
let rect = barreOrange.getBoundingClientRect();
let largeur = rect.width;

window.addEventListener("resize", () => {
    rect = barreOrange.getBoundingClientRect();
    largeur = rect.width;
});

barreOrange.addEventListener("click", (e) => {
    let x = e.clientX - rect.left;

    let widthPercent = (x * 100) / largeur;
    console.log(widthPercent);

    let durationVideo = video.duration;

    // position en sec par rapport au %
    video.currentTime = durationVideo * (widthPercent / 100);
});

// Plein écran
video.addEventListener("dblclick", () => {
    video.requestFullscreen();
});

btnPleinEcran.addEventListener("click", () => {
    video.requestFullscreen();
});
