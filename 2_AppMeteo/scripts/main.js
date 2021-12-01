const CLEFAPI = config.OPEN_WEATHER_APPID;
let resultatsAPI;

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
        });
}
