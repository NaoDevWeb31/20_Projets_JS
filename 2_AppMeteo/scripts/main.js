const CLEFAPI = config.OPEN_WEATHER_APPID;
let resultatsAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempPourH = document.querySelectorAll(".heure-prevision-valeur");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");
const imgIcone = document.querySelector(".logo-meteo");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // console.log(position);
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            AppelAPI(long, lat);
        },
        () => {
            alert(
                "Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner, veuillez l'activer !"
            );
        }
    );
}

function AppelAPI(long, lat) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`
    )
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            console.log(data);
            resultatsAPI = data;

            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(
                resultatsAPI.current.temp
            )}°C`;
            localisation.innerText = resultatsAPI.timezone;

            // les heures, par tranche de trois, avec leur temperature

            let heureActuelle = new Date().getHours();

            for (let i = 0; i < heure.length; i++) {
                let heureIncr = heureActuelle + i * 3;

                if (heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if (heureIncr === 24) {
                    heure[i].innerText = "00h ";
                } else {
                    heure[i].innerText = `${heureIncr} h`;
                }
            }

            // temp pour 3h
            for (let j = 0; j < tempPourH.length; j++) {
                tempPourH[j].innerText = `${Math.trunc(
                    resultatsAPI.hourly[j * 3].temp
                )} °C`;
            }
        });
}
