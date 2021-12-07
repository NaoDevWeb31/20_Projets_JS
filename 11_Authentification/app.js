                                        /**** FIREBASE ****/

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjrWyz_yAGQ64Rf222vxtiUF4FT9djfDQ",
    authDomain: "authentification-js-9e18e.firebaseapp.com",
    projectId: "authentification-js-9e18e",
    storageBucket: "authentification-js-9e18e.appspot.com",
    messagingSenderId: "835668297534",
    appId: "1:835668297534:web:63bd39a40c3041471e4e6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

console.log(auth);

                                        /**** APP ****/

const btnInscription = document.querySelector(".btn-inscription");
const btnConnexion = document.querySelector(".btn-connexion");
const deco = document.querySelector(".btn-deco");

const formInscription = document.querySelector(".form-inscription");
const formConnexion = document.querySelector(".form-connexion");

const emailInscription = document.querySelector(".email-inscription");
const mdpInscription = document.querySelector(".mdp-inscription");

btnInscription.addEventListener("click", () => {
    if (formConnexion.classList.contains("apparition")) {
        formConnexion.classList.remove("apparition");
        info.classList.toggle("disparition-info");
    }

    formInscription.classList.toggle("apparition");
    info.classList.toggle("disparition-info");
});

btnConnexion.addEventListener("click", () => {
    if (formInscription.classList.contains("apparition")) {
        formInscription.classList.remove("apparition");
        info.classList.toggle("disparition-info");
    }

    formConnexion.classList.toggle("apparition");
    info.classList.toggle("disparition-info");
});

formInscription.addEventListener("submit", (e) => {
    e.preventDefault();

    const mailValeur = emailInscription.value;
    const mdpInscriptionValeur = mdpInscription.value;

    createUserWithEmailAndPassword(auth, mailValeur, mdpInscriptionValeur).then(
        (userCredential) => {
            // Signed in
            console.log(userCredential);
            formInscription.reset();
            formInscription.classList.toggle("apparition");
        }
    );
});

// Deco

deco.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("Déconnecté");
    });
});

// Connexion

formConnexion.addEventListener("submit", (e) => {
    e.preventDefault();

    const mailValeur = emailConnexion.value;
    const mdpConnexionValeur = mdpConnexion.value;

    signInWithEmailAndPassword(auth, mailValeur, mdpConnexionValeur).then(
        (userCredential) => {
            // Logged in
            console.log("CONNEXION !", userCredential.user);
            formConnexion.reset();
            formConnexion.classList.toggle("apparition");
        }
    );
});

// Gérer le contenu

const h1 = document.querySelector("h1");
const info = document.querySelector(".info");

onAuthStateChanged(auth, (utilisateur) => {
    // User is signed in
    if (utilisateur) {
        info.innerText = "Voici le contenu privé !";
        h1.innerText = "Vous voilà de retour ! 😁";
    } else {
        console.log("Utilisateur s'est déconnecté");
        info.innerText = "Contenu public.";
        h1.innerText = "Bienvenue, inscrivez-vous ou connectez-vous";
    }
});
