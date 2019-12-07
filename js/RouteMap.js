var map;

$(function () {
    initMap();
    //cuando le da enter se reabre el modal

    //document.getElementById('txtOrigen').style.display = "none";
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    $(document).keyup(function (e) {
        if ($("#txtOrigen").is(":focus") && (e.keyCode == 13)) {
            document.getElementById('txtOrigenTrigger').innerHTML = document.getElementById("txtOrigen").value;
            document.getElementById('mdGeneraViaje').style.display = "block";
        }
    });
    google.maps.event.addDomListener(window, 'load', initSearch);
});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}

document.getElementById("txtOrigenTrigger").onclick = function ()/*function initSearch() */{
    document.getElementById('txtOrigen').style.display = "block";
    document.getElementById('mdGeneraViaje').style.display = "none";
    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));

    
    var input = document.getElementById('txtOrigen');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var options = {
        bounds: defaultBounds,
        types: ['address']
    };

    autocomplete = new google.maps.places.Autocomplete(input);
}