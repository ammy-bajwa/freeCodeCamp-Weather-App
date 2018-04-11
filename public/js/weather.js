
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    console.log(position);
    var lat = "lat=" + position.coords.latitude;
    var lon = "lon=" + position.coords.longitude;
    var api = "https://fcc-weather-api.glitch.me/api/current?";
    var urlString = api + lat + "&" + lon;
    $.ajax({
        url: urlString, success: function (result) {
            $("#location").html(result.name);
            $("#country").html(result.sys.country);
            currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
            temUnit = 'C';
            $("#temp").text(`${currentTempInCelsius} ${temUnit} ${String.fromCharCode(176)}`);
            $("#tempunit").text();
            $("#situation").text(result.weather[0].main);
            console.log(result);
            $("#icon").attr('src',result.weather[0].icon);
        }
    });
    $("#tempunit").click(() => {
        if (temUnit == "C") {
            temUnit = "F"
            fehTem = Math.round(parseInt(currentTempInCelsius) * 9 / 5 + 32);
            $("#temp").text(`${fehTem} ${temUnit} ${String.fromCharCode(176)}`);
        }
        else {
            temUnit = "C"
            $("#temp").text(`${currentTempInCelsius} ${temUnit} ${String.fromCharCode(176)}`);
        }
    });
    // function getIcon(desc) {
    //     var desc = desc.toLowerCase()
    //     switch (desc) {
    //         case 'drizzle':
    //             addIcon(desc)
    //             break;
    //         case 'clouds':
    //             addIcon(desc)
    //             break;
    //         case 'rain':
    //             addIcon(desc)
    //             break;
    //         case 'snow':
    //             addIcon(desc)
    //             break;
    //         case 'clear':
    //             addIcon(desc)
    //             break;
    //         case 'thunderstom':
    //             addIcon(desc)
    //             break;
    //         default:
    //             $('div.clouds').removeClass('hide');
    //     }
    // }
    // function addIcon(desc) {
    //     $('#icon' + desc).removeClass('hide');
    // }
}

getLocation();

