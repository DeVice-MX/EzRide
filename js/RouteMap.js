var map;
var marker;
var once = false;

$(function () {
    initMap();

    $('#fechaSalida').datepicker().datepicker("setDate", new Date());

    var date = new Date;
    date.setMinutes(date.getMinutes() + 10);
    $('#horaSalida').datetimepicker({
        format: 'LT',
        defaultDate: date,
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            if ($("#txtOrigen").is(":focus")) {
                document.getElementById('txtOrigenTrigger').innerHTML = document.getElementById("txtOrigen").value;
                $('#txtOrigenTrigger').attr('lat', autocomplete.getPlace().geometry.location.lat());
                $('#txtOrigenTrigger').attr('lng', autocomplete.getPlace().geometry.location.lng());
                $('#mdGeneraViaje').modal('show');
            }
            else if ($("#txtDestino").is(":focus")) {
                document.getElementById('btnDestinoTrigger').innerHTML = document.getElementById("txtDestino").value;
                $('#btnDestinoTrigger').attr('lat', autocomplete.getPlace().geometry.location.lat());
                $('#btnDestinoTrigger').attr('lng', autocomplete.getPlace().geometry.location.lng());
                $('#mdGeneraViaje').modal('show');
            }
        }
    });

    $('#txtOrigenTrigger').on('click', fnTriggerTextOrigen);

    $('#btnDestinoTrigger').on('click', fnTriggerTextDestino);

    $('#btnSaveViaje').on('click', saveViaje);

});

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.144924, lng: -101.016557 },
        zoom: 15,
    });
}

var fnTriggerTextOrigen = function () {
    $('#txtDestino').attr('hidden', true);
    $('#txtOrigen').attr('hidden', false);
    $('#mdGeneraViaje').modal('hide');
    if (map.controls[google.maps.ControlPosition.TOP_LEFT].length > 0)
        map.controls[google.maps.ControlPosition.TOP_LEFT].pop();
    var input = document.getElementById('txtOrigen');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        centerMap(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng(), 'txtOrigen');
    });
}

var fnTriggerTextDestino = function () {
    $('#txtOrigen').attr('hidden', true);
    $('#txtDestino').attr('hidden', false);
    $('#mdGeneraViaje').modal('hide');
    if (map.controls[google.maps.ControlPosition.TOP_LEFT].length > 0)
        map.controls[google.maps.ControlPosition.TOP_LEFT].pop();
    var input = document.getElementById('txtDestino');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        centerMap(autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng(), 'txtDestino');
    });
}

function centerMap(lat, long, idBtn) {
    map.setCenter(new google.maps.LatLng(lat, long));
    marker = new google.maps.Marker({
        position: locationRio,
        map: map,
        title: "Isaac",
    });
}

var fnSaveViaje = function () {
    jParams = {

    };
}